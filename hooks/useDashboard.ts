import { getDashboard } from "@/api/get-dashboard"
import { dashboard, type DashboardPeriod } from "@/types/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useDashboard = (period?: Exclude<DashboardPeriod, "all">) => {
    return useQuery<dashboard>({
        queryKey: ["dashboard", period],
        queryFn: async () : Promise<dashboard> => {
            const res = await getDashboard(period);

            if (!res.success) {
                throw new Error(res.message);
            }

            return res.data
        }
    })
}