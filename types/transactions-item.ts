export interface transactionItem {
    _id: string;
    category: string;
    amount: number;
    type: "expense" | "income";
    payement_way: string;
    createdAt: Date;
}
