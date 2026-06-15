import { z } from "zod";

const categories = ["food", "transport", "shopping", "bills", "entertainment", "health", "education", "travel", "groceries", "salary", "other"] as const
const incomeOnlyCategories = ["salary"]
const paymentMethods = ["cash", "card", "bank account"] as const

export const transactionSchema = z.object({
    category: z.enum(categories, { message: "Invalid category" }),
    amount: z.string().min(1, "Amount is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
    type: z.enum(["expense", "income"], { message: "Type must be expense or income" }),
    payment_way: z.enum(paymentMethods, { message: "Select a payment method" }),
}).superRefine((data, ctx) => {
    if (incomeOnlyCategories.includes(data.category) && data.type === "expense") {
        ctx.addIssue({
            code: "invalid_value",
            message: `${data.category} cannot be an expense`,
            path: ["type"],
            values: [],
        })
    }
})

export type TransactionSchemaType = z.infer<typeof transactionSchema>
export { categories, paymentMethods }
