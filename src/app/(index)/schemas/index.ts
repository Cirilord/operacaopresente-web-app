import { z } from 'zod'

export const ResponseSchema = z.object({
    answer: z.union([z.string(), z.array(z.string())]),
    question: z.string()
})

export const PlansSchema = z.object({
    advanced: z.array(ResponseSchema),
    free: z.array(ResponseSchema),
    simple: z.array(ResponseSchema)
})