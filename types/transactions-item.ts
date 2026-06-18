import { categories, paymentMethods } from '@/schemas/transaction-schema';

type Category = typeof categories[number];
type PaymentMethod = typeof paymentMethods[number];

export interface transactionItem {
    _id: string;
    category: Category;
    amount: number;
    type: "expense" | "income";
    payment_way: PaymentMethod;
    createdAt: Date;
}
