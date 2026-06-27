import { z } from "zod";
import { categories } from "./transaction-schema";

export const budgetSchema = z.object({
    category: z.enum(categories, { message: "Select a category" }),
    limit: z.string().min(1, "Limit is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
})

export const updateBudgetSchema = z.object({
    limit: z.string().min(1, "Limit is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
})

export type BudgetSchemaType = z.infer<typeof budgetSchema>
export type UpdateBudgetSchemaType = z.infer<typeof updateBudgetSchema>
