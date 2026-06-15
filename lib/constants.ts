import Ionicons from "@expo/vector-icons/Ionicons";

export const categoryColors: Record<string, string> = {
    food: "#f97316",
    transport: "#3b82f6",
    shopping: "#ec4899",
    bills: "#64748b",
    entertainment: "#a855f7",
    health: "#22c55e",
    education: "#06b6d4",
    travel: "#6366f1",
    groceries: "#84cc16",
    salary: "#10b981",
    other: "#78716c",
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