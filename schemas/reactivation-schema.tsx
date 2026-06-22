import { z } from "zod";

export const reactivationSchema = z.object({
    email: z.email("Invalid email address"),
});

export type ReactivationSchemaType = z.infer<typeof reactivationSchema>
