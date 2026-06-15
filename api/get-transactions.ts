import { getToken } from "@/lib/token";
import { transactionItem } from "@/types/transactions-item";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getTransactions = async (limit?: number) => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: null,
            };
        }

        const url = limit ? `${API_URL}/api/transactions?limit=${limit}` : `${API_URL}/api/transactions`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        return {
            success: response.ok,
            data: result as transactionItem[],
            message: result.message ?? "Fetched transactions",
        };
    } catch (error) {
        console.error("Get transactions error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
