import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const deleteAccount = async () => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: null,
            };
        }

        const response = await fetch(`${API_URL}/api/auth/delete-user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        return {
            success: response.ok,
            message: result.message ?? (response.ok ? "Account deleted" : "Failed to delete account"),
            data: result,
        };
    } catch (error) {
        console.error("Delete account error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
