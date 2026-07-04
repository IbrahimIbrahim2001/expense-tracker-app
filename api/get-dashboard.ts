import { getToken } from "@/lib/token";
import { dashboard, type DashboardPeriod } from "@/types/dashboard";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getDashboard = async (period?: Exclude<DashboardPeriod, "all">) : Promise<{ success: boolean; data: dashboard, message: string }> => {
    try {
        const token = await getToken();

        if (!token) {
            return {
                success: false,
                message: "Not authenticated",
                data: { period: "all", income: 0, expense: 0, balance: 0, totalTransactions: 0 },
            };
        }

        const url = period ? `${API_URL}/api/dashboard/summary?period=${period}` : `${API_URL}/api/dashboard/summary`
        const response = await fetch(url, {
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
            data: {} as dashboard,
        };
    }
};
