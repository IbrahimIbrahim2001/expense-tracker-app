import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const deleteBudget = async (id: string) => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
            };
        }

        const response = await fetch(`${API_URL}/api/budget/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        return {
            success: response.ok,
            message: response.ok ? "Budget deleted" : (result.message ?? "Failed to delete budget"),
        };
    } catch (error) {
        console.error("Delete budget error:", error);

        return {
            success: false,
            message: "Network request failed",
        };
    }
};
