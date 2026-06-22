import { ReactivationSchemaType } from "@/schemas/reactivation-schema";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const requestReactivation = async (data: ReactivationSchemaType) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/request-reactivation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        return {
            success: response.ok,
            message:
                result.message ??
                (response.ok
                    ? "Reactivation link sent to your email"
                    : "Failed to request reactivation"),
            data: result,
        };
    } catch (error) {
        console.error("Reactivation error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};
