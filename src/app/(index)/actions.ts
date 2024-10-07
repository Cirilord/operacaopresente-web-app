'use server'
import Handlebars from 'handlebars'
import jsPDF from 'jspdf'
import { ClientOptions, OpenAI } from 'openai'
import { RESPONSE_TEMPLATE } from './constants'
import { Stripe } from 'stripe'
import { headers } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { v7 as uuidv7 } from 'uuid'
import { db } from '@/lib/firebaseConfig'

Handlebars.registerHelper('isArray', function (array: unknown) {
    return Array.isArray(array)
})

Handlebars.registerHelper('join', function (array: unknown, separator: string) {
    return Array.isArray(array) ? array.join(separator) : ''
})

const clientOptions: ClientOptions = { apiKey: process.env.OPENAI_API_KEY }
    , openAi = new OpenAI(clientOptions)
    , stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function generatePdf(responses: { answer: string | string[], question: string }[]) {

    const template = Handlebars.compile(RESPONSE_TEMPLATE)
        , content = template({ responses })
        , readonlyHeaders = headers()
        , origin = readonlyHeaders.get('origin') || ''
        , paymentId = uuidv7()

    debugger

    const chatCompletion = await openAi.chat.completions.create({
        messages: [{ role: 'user', content }],
        model: 'gpt-4o-mini', // ou 'gpt-3.5-turbo'
    })

    const data = JSON.parse(chatCompletion.choices[0].message.content || '')

    const session = await stripe.checkout.sessions.create({
        cancel_url: `${origin}/?canceled=true`,
        line_items: [
            {
                price: 'price_1Q4uo0P7kMTPqIlVPRV9hUHr',
                quantity: 1
            }
        ],
        locale: 'pt-BR',
        metadata: { paymentId },
        mode: 'payment',
        success_url: `${origin}/sucesso?paymentId=${paymentId}`
    })

    const docRef = await db.collection('payments').doc(paymentId).set({
        stripeId: session.id,
        responses,
        data
    })

    if (session.url) {
        redirect(session.url, RedirectType.push)
    }
}