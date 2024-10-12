'use server'
import questions from '@/data/questions.json'
import { db } from '@/lib/firebaseConfig'
import { headers } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { Stripe } from 'stripe'
import { v7 as uuidv7 } from 'uuid'
import { PlanSchema } from './schemas'
import { Plan } from './types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function generatePayment(planUnparsed: Plan) {

    const planParsed = PlanSchema.safeParse(planUnparsed)

    if (!planParsed.success) {
        return { error: {}, success: false } as const
    }

    const { responses, type: planType } = planParsed.data

    if (Object.keys(questions).includes(planType)) {
        responses.length = questions[planType].length
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