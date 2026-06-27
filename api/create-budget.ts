import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const createBudget = async (payload: { category: string; limit: number }) => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
            };
        }

        const response = await fetch(`${API_URL}/api/budget/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        return {
            success: response.ok,
            data: response.ok ? result : null,
            message: response.ok ? "Budget created" : (result.message ?? "Failed to create budget"),
        };
    } catch (error) {
        console.error("Create budget error:", error);

        return {
            success: false,
            message: "Network request failed",
        };
    }
};
