import { getBudgets } from "@/api/get-budgets"
import { budget } from "@/types/budget"
import { useQuery } from "@tanstack/react-query"

export const useBudgets = () => {
    return useQuery<budget[]>({
        queryKey: ["budgets"],
        queryFn: async () : Promise<budget[]> => {
            const res = await getBudgets();

            if (!res.success) {
                throw new Error(res.message);
            }

            return res.data
        }
    }
)
}
