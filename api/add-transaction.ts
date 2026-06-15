import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const addTransaction = async (data: {
    category: string;
    amount: number;
    type: "expense" | "income";
    payment_way: string;
}) => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: null,
            };
        }

        const response = await fetch(`${API_URL}/api/transactions/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        return {
            success: response.ok,
            message: result.message ?? (response.ok ? "Transaction added" : "Failed to add transaction"),
            data: result,
        };
    } catch (error) {
        console.error("Add transaction error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
