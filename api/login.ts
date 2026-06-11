import { LoginSchemaType } from "@/schemas/login-schema";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const login = async (data: LoginSchemaType) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
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
                response.statusText ??
                (response.ok ? "Login successful" : "Login failed"),
            data: result,
        };
    } catch (error) {
        console.error("Login error:", error);

        return {
            success: false,
            message: "Network request failed",
            data: null,
        };
    }
};