const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getCurrentUser = async (token: string) => {
    try {

        if (!token) {
            return {
                success: false,
                data: null,
                message: "No token found",
            };
        }

        const response = await fetch(`${API_URL}/api/auth/current-user`, {
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
            message: result.message ?? "Fetched user",
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: null,
            message: "Network error",
        };
    }
};