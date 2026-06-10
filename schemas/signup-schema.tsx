import isStrongPassword from 'validator/lib/isStrongPassword';
import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(3, "Username is required"),
    email: z.email("Invalid email address"),
    password: z.string().refine((password) =>
        isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
        })
        , "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."),
});

export type SignupSchemaType = z.infer<typeof signupSchema>