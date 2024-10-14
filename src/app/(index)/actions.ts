'use server'
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

    const defaultPayment = {
        createdAt: new Date(),
        data: [],
        pdfUrl: null,
        planType,
        responses,
        stripeId: null as string | null,
        updatedAt: null
    }

    const paymentId = uuidv7()

    if (['advanced', 'simple'].includes(planType)) {

        const readonlyHeaders = headers()
            , redirectUrl = readonlyHeaders.get('origin') || ''

        const session = await stripe.checkout.sessions.create({
            cancel_url: redirectUrl,
            line_items: [
                {
                    price: 'price_1Q4uo0P7kMTPqIlVPRV9hUHr',
                    quantity: 1
                }
            ],
            locale: 'pt-BR',
            metadata: { paymentId },
            mode: 'payment',
            success_url: `${redirectUrl}/sucesso?paymentId=${paymentId}`
        })

        if (session.id && session.url) {

            defaultPayment.stripeId = session.id

            await db.collection('payments').doc(paymentId).set(defaultPayment)

            return redirect(session.url, RedirectType.push)
        }
    }
    else if (planType === 'free') {

        await db.collection('payments').doc(paymentId).set(defaultPayment)

        return redirect(`sucesso?paymentId=${paymentId}`, RedirectType.push)
    }

    return { error: {}, success: false } as const
}