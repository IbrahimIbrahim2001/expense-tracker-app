import isStrongPassword from 'validator/lib/isStrongPassword';
import { z } from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().refine((password) =>
        isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
        })
        , "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
