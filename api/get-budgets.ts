import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getBudgets = async () => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: null,
            };
        }

        const response = await fetch(`${API_URL}/api/budget`, {
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
            message: result.message ?? "Fetched budgets",
        };
    } catch (error) {
        console.error("Get budgets error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
