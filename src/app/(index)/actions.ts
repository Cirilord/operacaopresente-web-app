'use server'
import questions from '@/data/questions.json'
import { db } from '@/lib/firebaseConfig'
import { headers } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { Stripe } from 'stripe'
import { v7 as uuidv7 } from 'uuid'
import { z } from 'zod'
import { ResponseSchema } from './schemas'
import { PlanType, Response } from './types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function generatePayment(responsesUnparsed: Response[], planType: PlanType) {

    const responsesParsed = z.array(ResponseSchema).safeParse(responsesUnparsed)

    if (!responsesParsed.success) {
        return { error: {}, success: false } as const
    }

    let responses = responsesParsed.data

    if (Object.keys(questions).includes(planType)) {
        responses = responses.slice(0, questions[planType].length)
    }
    else {
        return { error: {}, success: false } as const
    }

    const readonlyHeaders = headers()
        , origin = readonlyHeaders.get('origin') || ''
        , paymentId = uuidv7()

    const session = await stripe.checkout.sessions.create({
        cancel_url: origin,
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

    await db.collection('payments').doc(paymentId).set({
        createdAt: new Date(),
        data: [],
        pdfUrl: null,
        planType,
        responses,
        stripeId: session.id,
        updatedAt: null
    })

    if (session.url) {
        redirect(session.url, RedirectType.push)
    }

    return { error: {}, success: false } as const
}