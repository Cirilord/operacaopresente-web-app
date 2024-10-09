import type questions from '@/data/questions.json'
import { z } from 'zod'
import { ResponseSchema } from '../schemas'

export type PlanType = keyof typeof questions

export type Response = z.infer<typeof ResponseSchema>