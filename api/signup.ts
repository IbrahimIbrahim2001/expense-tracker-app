import { SignupSchemaType } from "@/schemas/signup-schema";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const signup = async (data: SignupSchemaType) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}