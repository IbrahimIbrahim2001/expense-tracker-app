export interface transactionItem {
    _id: string;
    category: string;
    amount: number;
    type: "expense" | "income";
    payment_way: string;
    createdAt: Date;
}
