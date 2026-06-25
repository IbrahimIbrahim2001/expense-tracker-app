import { getDashboard } from "@/api/get-dashboard"
import { dashboard } from "@/types/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useDashboard = () => {
    return useQuery<dashboard>({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const res = await getDashboard();

            if (!res.success) {
                throw new Error(res.message);
            }

            return res.data
        }
    })
}