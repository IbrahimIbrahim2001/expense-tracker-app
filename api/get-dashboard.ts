import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getDashboard = async () => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: null,
            };
        }

        const response = await fetch(`${API_URL}/api/dashboard/summary`, {
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
            message: result.message ?? "Fetched dashboard",
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
