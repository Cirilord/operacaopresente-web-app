'use server'
import { db, storage } from '@/lib/firebaseConfig'
import JWT from '@ilovepdf/ilovepdf-js-core/auth/JWT'
import HtmlPdfTask from '@ilovepdf/ilovepdf-js-core/tasks/HtmlPdfTask'
import XHRPromise from '@ilovepdf/ilovepdf-js-core/utils/XHRPromise'
import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs'
import { getDownloadURL } from 'firebase-admin/storage'
import Handlebars from 'handlebars'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import OpenAI, { ClientOptions } from 'openai'
import { v7 as uuidv7, validate as uuidValidate } from 'uuid'
import { RESPONSE_TEMPLATE } from './constants'

const clientOptions: ClientOptions = { apiKey: process.env.OPENAI_API_KEY }
    , openAi = new OpenAI(clientOptions)

Handlebars.registerHelper('isArray', (array: unknown) => {
    return Array.isArray(array)
})

Handlebars.registerHelper('join', (array: unknown, separator: string) => {
    return Array.isArray(array) ? array.join(separator) : ''
})

export async function generatePdf(paymentId: string) {

    if (!uuidValidate(paymentId)) {
        return { error: {}, success: false } as const
    }

    const readonlyHeaders = headers()
        , origin = readonlyHeaders.get('origin') || ''
        , paymentDocument = db.collection('payments').doc(paymentId)
        , payment = (await paymentDocument.get()).data()

    if (!payment) {
        return { error: {}, success: false } as const
    }

    const dataExists = !!payment.data?.length

    const data = dataExists ? payment.data : await new Promise(async resolve => {

        const template = Handlebars.compile(RESPONSE_TEMPLATE)
            , content = template({ responses: payment.responses })

        const chatCompletion = await openAi.chat.completions.create({
            messages: [{ role: 'user', content }],
            model: 'gpt-4o-mini' // ou 'gpt-3.5-turbo'
        })

        const data = JSON.parse(chatCompletion.choices[0].message.content || '')

        resolve(data)
    })

    if (!dataExists) {
        await db.collection('payments').doc(paymentId).update({ data })
    }

    const thumbnail = await new Promise<string>(async (resolve, reject) => {

        const xhr = new XHRPromise
            , auth = new JWT(xhr, process.env.ILOVEPDF_PUBLIC_KEY!, process.env.ILOVEPDF_SECRET_KEY!)
            , instance = new ILovePDFApi(process.env.ILOVEPDF_PUBLIC_KEY!, process.env.ILOVEPDF_SECRET_KEY!)
            , task = instance.newTask('htmlpdf') as HtmlPdfTask
            , token = await auth.getToken()

        await task.start()

        const url = `${origin}/preview?paymentId=${paymentId}`
            , baseFile = await task.addFile(url)
            , formData = new FormData()

        formData.append('server_filename', baseFile.serverFilename)
        formData.append('task', baseFile.taskId)
        formData.append('page_orientation', 'portrait')
        formData.append('page_margin', '0')
        formData.append('url', url)
        formData.append('view_width', '1024')
        formData.append('page_size', 'A4')
        formData.append('single_page', 'true')
        formData.append('block_ads', 'false')
        formData.append('remove_popups', 'false')

        const init: RequestInit = {
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'POST'
        }

        const response = await fetch('https://api32.ilovepdf.com/v1/preview', init)
            , data = await response.json()

        if (response.ok) {
            resolve(data.thumbnail)
        }
        else {
            reject(new Error(data.message))
        }
    })

    const fileBuffer = await new Promise<Buffer>(async resolve => {

        const fileLocation = `https://api32.ilovepdf.com/thumbnails/${thumbnail}`
            , fileResponse = await fetch(fileLocation)
            , fileBuffer = Buffer.from(await fileResponse.arrayBuffer())

        resolve(fileBuffer)
    })

    const fileName = `${uuidv7()}.pdf`
        , fileRef = await storage.bucket().file(fileName)

    await fileRef.save(fileBuffer, { contentType: 'application/pdf' })

    const fileUrl = await getDownloadURL(fileRef)

    await paymentDocument.update({ pdfUrl: fileUrl })

    revalidatePath(origin)
}