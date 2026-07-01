import { getToken } from "@/lib/token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const uploadAvatar = async (imageUri: string) => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: null,
            };
        }

        const formData = new FormData();
        formData.append("avatar", {
            uri: imageUri,
            type: "image/jpeg",
            name: "avatar.jpg",
        } as any);

        const response = await fetch(`${API_URL}/api/auth/upload-avatar`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const result = await response.json();

        return {
            success: response.ok,
            message: result.message ?? (response.ok ? "Avatar uploaded" : "Failed to upload avatar"),
            data: result,
        };
    } catch (error) {
        console.error("Upload avatar error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
