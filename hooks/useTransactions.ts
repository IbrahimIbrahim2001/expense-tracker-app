import { getTransactions } from "@/api/get-transactions";
import { transactionItem } from "@/types/transactions-item";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = (limit?: number) => {
    return useQuery<transactionItem[]>({
        queryKey: ["transactions", limit],
        queryFn: async () => {
            const res = await getTransactions(limit);

            if (!res.success) {
                throw new Error(res.message);
            }

            return (res.data ?? []).map((item) => ({
                ...item,
                createdAt: new Date(item.createdAt),
            }));
        },
    });
};
