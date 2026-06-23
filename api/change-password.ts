import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
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

        const response = await fetch(`${API_URL}/api/auth/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        return {
            success: response.ok,
            message: result.message ?? (response.ok ? "Password changed successfully" : "Failed to change password"),
            data: result,
        };
    } catch (error) {
        console.error("Change password error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
