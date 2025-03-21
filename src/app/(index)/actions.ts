'use server'
import { db } from '@/lib/firebaseConfig'
import { ConfidentialClientApplication } from '@azure/msal-node'
import { Client } from '@microsoft/microsoft-graph-client'
import Handlebars from 'handlebars'
import { headers } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { Stripe } from 'stripe'
import { t } from 'tuple-it'
import { v7 as uuidv7 } from 'uuid'
import { CONTACT_TEMPLATE } from './constants'
import { ContactSchema, PlanSchema } from './schemas'
import { Contact, Plan } from './types'
import { MercadoPagoConfig, Payment, Preference, PaymentMethod } from 'mercadopago'

const app = new ConfidentialClientApplication({
    auth: {
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID!}`,
        clientId: process.env.AZURE_CLIENT_ID!,
        clientSecret: process.env.AZURE_CLIENT_SECRET!,
    }
})

// const mercadoPago = new MercadoPagoConfig({
//     accessToken: '',
//     options: {
//         idempotencyKey: 'abc',
//         timeout: 5000
//     }
// })

const preference = new Preference(
    new MercadoPagoConfig({
        accessToken: '',
        options: {
            idempotencyKey: 'abc',
            timeout: 5000
        }
    })
)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function sendEmail(contactUnparsed: Contact) {

    const contactParsed = ContactSchema.safeParse(contactUnparsed)

    if (!contactParsed.success) {
        return { error: {}, success: false } as const
    }

    const [authenticationResultError, authenticationResult] =
        await t(app.acquireTokenByClientCredential({ scopes: ['https://graph.microsoft.com/.default'] }))

    if (authenticationResultError || !authenticationResult) {
        return { error: {}, success: false } as const
    }

    const { accessToken } = authenticationResult
        , client = Client.init({ authProvider: (done) => { done(null, accessToken) } })
        , contact = contactParsed.data
        , template = Handlebars.compile(CONTACT_TEMPLATE)
        , content = template({ email: contact.email, message: contact.message, name: contact.name })

    const email = {
        message: {
            body: {
                content,
                contentType: 'HTML'
            },
            subject: 'Tentativa de contato',
            toRecipients: [
                {
                    emailAddress: {
                        address: 'contato@operacaopresente.com'
                    }
                }
            ]
        },
        saveToSentItems: 'false'
    }

    const [responseError] = await t(client.api('/users/contato@operacaopresente.com/sendMail')
        .header('Content-type', 'application/json')
        .post(email))

    if (responseError) {
        return { error: {}, success: false } as const
    }

    return { data: null, success: true } as const
}

export async function generatePayment(planUnparsed: Plan) {

    const planParsed = PlanSchema.safeParse(planUnparsed)

    if (!planParsed.success) {
        return { error: {}, success: false } as const
    }

    const a = await preference.create({
        body: {
            // back_urls: {
            //     success: `${redirectUrl}/sucesso?paymentId=${paymentId}`
            // },
            payment_methods: {
                excluded_payment_methods: [{ id: 'pec' }],
                // excluded_payment_methods: [{ id: }],
                installments: 1
            },
            items: [
                {

                    id: uuidv7(),
                    picture_url: 'https://www.operacaopresente.com/static/10613008_10070_rect.svg',
                    quantity: 1,
                    title: planParsed.data.type === 'advanced' ? 'Dossiê Avançado' : 'Dossiê Simples',
                    unit_price: planParsed.data.price || 0
                }
            ]
        }
    })

    debugger

    console.log(a)

    const { responses, type: planType } = planParsed.data

    const defaultPayment = {
        createdAt: new Date(),
        data: [],
        pdfUrl: null,
        planType,
        preferenceId: null as string | null,
        responses,
        stripeId: null as string | null,
        updatedAt: null
    }

    const paymentId = uuidv7()

    switch (planType) {
        case 'advanced':
        case 'simple': {

            const readonlyHeaders = headers()
                , redirectUrl = readonlyHeaders.get('origin') || ''

            const preferenceResponse = await preference.create({
                body: {
                    auto_return: 'approved',
                    back_urls: {
                        success: `${redirectUrl}/sucesso?paymentId=${paymentId}`
                    },
                    expires: false,
                    payment_methods: {
                        excluded_payment_methods: [{ id: 'pec' }],
                        installments: 1
                    },
                    items: [
                        {
                            id: uuidv7(),
                            picture_url: 'https://www.operacaopresente.com/static/10613008_10070_rect.svg',
                            quantity: 1,
                            title: planType === 'advanced' ? 'Dossiê Avançado' : 'Dossiê Simples',
                            unit_price: planParsed.data.price || 0
                        }
                    ]
                }
            })

            if (preferenceResponse.id && preferenceResponse.sandbox_init_point) {

                // defaultPayment.stripeId = preferenceResponse.id

                defaultPayment.preferenceId = preferenceResponse.id

                await db.collection('payments').doc(paymentId).set(defaultPayment)

                return redirect(preferenceResponse.sandbox_init_point, RedirectType.push)
            }

            // const session = await stripe.checkout.sessions.create({
            //     cancel_url: redirectUrl,
            //     line_items: [
            //         {
            //             price: 'price_1Q4uo0P7kMTPqIlVPRV9hUHr',
            //             quantity: 1
            //         }
            //     ],
            //     locale: 'pt-BR',
            //     metadata: { paymentId },
            //     mode: 'payment',
            //     success_url: `${redirectUrl}/sucesso?paymentId=${paymentId}`
            // })

            // if (session.id && session.url) {

            //     defaultPayment.stripeId = session.id

            //     await db.collection('payments').doc(paymentId).set(defaultPayment)

            //     return redirect(session.url, RedirectType.push)
            // }
        }
        case 'free': {

            await db.collection('payments').doc(paymentId).set(defaultPayment)

            return redirect(`sucesso?paymentId=${paymentId}`, RedirectType.push)
        }
        default: {
            return { error: {}, success: false } as const
        }
    }
}