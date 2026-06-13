export interface transactionItem {
    _id: string;
    category: string;
    amount: string;
    type: "expense" | "income";
    payement_way: string;
    createdAt: Date;
}
