import { z } from 'zod'
import { PlanSchema, PlansSchema, ResponseSchema } from '../schemas'

export type Plan = z.infer<typeof PlanSchema>

export type Plans = z.infer<typeof PlansSchema>

export type Response = z.infer<typeof ResponseSchema>