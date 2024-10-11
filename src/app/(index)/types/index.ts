import type questions from '@/data/questions.json'
import { z } from 'zod'
import { PlansSchema, ResponseSchema } from '../schemas'

export type Plans = z.infer<typeof PlansSchema>

export type PlanType = keyof typeof questions

export type Response = z.infer<typeof ResponseSchema>