import { transactionItem } from "@/types/transactions-item";
import Ionicons from "@expo/vector-icons/Ionicons";

// TODO: delete this
export const MockItems: transactionItem[] = [
    {
        _id: "1",
        category: "food",
        amount: "8",
        type: "expense",
        payement_way: "card",
        createdAt: new Date("2026-08-08T12:00:00.000Z")
    },
    {
        _id: "2",
        category: "transport",
        amount: "12",
        type: "expense",
        payement_way: "cash",
        createdAt: new Date("2026-08-08T12:00:00.000Z")
    },
    {
        _id: "3",
        category: "salary",
        amount: "1000",
        type: "income",
        payement_way: "bank account",
        createdAt: new Date("2026-08-08T12:00:00.000Z")
    },
    {
        _id: "4",
        category: "shopping",
        amount: "250",
        type: "expense",
        payement_way: "card",
        createdAt: new Date("2026-08-09T10:30:00.000Z")
    },
    {
        _id: "5",
        category: "entertainment",
        amount: "40",
        type: "expense",
        payement_way: "cash",
        createdAt: new Date("2026-08-10T18:00:00.000Z")
    },
    {
        _id: "6",
        category: "salary",
        amount: "1200",
        type: "income",
        payement_way: "bank account",
        createdAt: new Date("2026-08-11T09:00:00.000Z")
    }
];

export const categoryBgClasses: Record<string, string> = {
    food: "bg-category-food",
    transport: "bg-category-transport",
    shopping: "bg-category-shopping",
    bills: "bg-category-bills",
    entertainment: "bg-category-entertainment",
    health: "bg-category-health",
    education: "bg-category-education",
    travel: "bg-category-travel",
    groceries: "bg-category-groceries",
    salary: "bg-category-salary",
    other: "bg-category-other",
};

export const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    food: "restaurant",
    transport: "bus",
    shopping: "cart",
    bills: "receipt",
    entertainment: "film",
    health: "medkit",
    education: "school",
    travel: "airplane",
    groceries: "basket",
    salary: "cash",
    other: "ellipsis-horizontal",
};