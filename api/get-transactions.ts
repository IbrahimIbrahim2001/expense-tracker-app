import { getToken } from "@/lib/token";
import { transactionItem } from "@/types/transactions-item";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface PageData {
    items: transactionItem[]
    nextCursor: string | null
}

export const getTransactions = async (limit?: number, cursor?: string): Promise<{ success: boolean; data: transactionItem[] | PageData; message: string }> => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: [],
            };
        }

        const params = new URLSearchParams()
        if (limit) params.append('limit', String(limit))
        if (cursor) params.append('cursor', cursor)

        const url = params.toString()
            ? `${API_URL}/api/transactions?${params}`
            : `${API_URL}/api/transactions`

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
            data: result,
            message: result.message ?? "Fetched transactions",
        };
    } catch (error) {
        console.error("Get transactions error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: [],
        };
    }
};
