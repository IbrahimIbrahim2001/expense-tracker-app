import { getToken } from "@/lib/token";
import { budget } from "@/types/budget";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getBudgets = async () : Promise<{ success: boolean; message: string; data: budget[]}> => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: [],
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
            data: result as budget[],
            message: result.message ?? "Fetched budgets",
        };
    } catch (error) {
        console.error("Get budgets error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: [],
        };
    }
};
