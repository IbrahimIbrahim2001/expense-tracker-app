import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const updateProfile = async (data: {
    firstName?: string;
    lastName?: string;
    address?: string;
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

        const response = await fetch(`${API_URL}/api/auth/update-profile`, {
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
            message: result.message ?? (response.ok ? "Profile updated" : "Failed to update profile"),
            data: result,
        };
    } catch (error) {
        console.error("Update profile error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
