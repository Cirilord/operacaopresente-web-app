import { z } from 'zod'

export const ContactSchema = z.object({
    email: z.string().email(),
    message: z.string().min(1).max(255),
    name: z.string().min(1).max(100)
})

export const ResponseSchema = z.object({
    answer: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
    question: z.string().min(1)
})

export const PlanSchema = z.object({
    responses: z.array(ResponseSchema),
    type: z.enum(['advanced', 'free', 'simple'])
}).refine((data) => {
    const { type, responses } = data

    if (type === 'free' && responses.length > 3) {
        return false
    }
    if (type === 'simple' && responses.length > 7) {
        return false
    }
    if (type === 'advanced' && responses.length > 12) {
        return false
    }

    return true
}, {
    message: 'The number of responses exceeds the allowed limit for the selected plan type.',
    path: ['responses']
})

export const PlansSchema = z.object({
    advanced: z.array(ResponseSchema),
    free: z.array(ResponseSchema),
    simple: z.array(ResponseSchema)
})