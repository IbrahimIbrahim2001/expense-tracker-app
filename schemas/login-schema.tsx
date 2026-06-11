import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8).max(20)
})

export type LoginSchemaType = z.infer<typeof loginSchema>