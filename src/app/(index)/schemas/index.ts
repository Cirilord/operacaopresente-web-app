import { z } from 'zod'

export const ResponseSchema = z.object({
    answer: z.union([z.string(), z.array(z.string())]),
    question: z.string()
})