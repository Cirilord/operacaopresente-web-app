import { z } from 'zod'
import { ContactSchema, PlanSchema, PlansSchema, ResponseSchema } from '../schemas'

export type Contact = z.infer<typeof ContactSchema>

export type Plan = z.infer<typeof PlanSchema>

export type Plans = z.infer<typeof PlansSchema>

export type Response = z.infer<typeof ResponseSchema>