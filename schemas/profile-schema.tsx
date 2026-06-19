import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string().min(1, "First name cannot be empty").max(50, "First name must be 50 characters or less"),
    lastName: z.string().min(1, "Last name cannot be empty").max(50, "Last name must be 50 characters or less"),
    address: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
