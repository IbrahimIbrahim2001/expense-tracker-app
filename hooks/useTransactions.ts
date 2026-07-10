import { getTransactions } from "@/api/get-transactions";
import { transactionItem } from "@/types/transactions-item";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const RECENT_TRANSACTIONS_LIMIT = 5
const PAGE_SIZE = 20

const normalizeItem = (item: transactionItem): transactionItem => ({
    ...item,
    createdAt: new Date(item.createdAt),
});

export const useTransactions = (limit?: number) => {
    return useQuery<transactionItem[]>({
        queryKey: ["transactions", limit],
        queryFn: async () => {
            const res = await getTransactions(limit);

            if (!res.success) {
                throw new Error(res.message);
            }

            const items = Array.isArray(res.data) ? res.data : (res.data as any)?.data ?? []
            return (items as transactionItem[]).map(normalizeItem);
        },
        select: (data) => data.map(normalizeItem),
    });
};

export interface PageData {
    items: transactionItem[]
    nextCursor: string | null
}

export const useTransactionsInfinite = () => {
    return useInfiniteQuery<PageData>({
        queryKey: ["transactions", "infinite"],
        queryFn: async ({ pageParam }): Promise<PageData> => {
            const res = await getTransactions(PAGE_SIZE, pageParam as string | undefined);

            if (!res.success || !res.data) {
                throw new Error(res.message ?? "Failed to load transactions");
            }

            const page = res.data as unknown as { data: transactionItem[]; nextCursor: string | null; hasMore: boolean }

            return {
                items: (page.data ?? []).map(normalizeItem),
                nextCursor: page.nextCursor,
            };
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        select: (data) => ({
            ...data,
            pages: data.pages.map((page) => ({
                ...page,
                items: page.items.map(normalizeItem),
            })),
        }),
    });
};
