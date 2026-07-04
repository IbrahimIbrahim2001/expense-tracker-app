import { getTransactions } from "@/api/get-transactions";
import { transactionItem } from "@/types/transactions-item";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import React from "react";
import { useTransactions } from "../useTransactions";

jest.mock("@/api/get-transactions");

const mockTransactions: transactionItem[] = [
    { _id: '1', amount: 100, category: 'food', createdAt: new Date('2023-01-02'), payment_way: 'cash', type: 'expense' },
    { _id: '2', amount: 50, category: 'transport', createdAt: new Date('2023-01-02'), payment_way: 'card', type: 'expense' },
    { _id: '3', amount: 500, category: 'salary', createdAt: new Date('2023-01-02'), payment_way: 'bank account', type: 'income' },
    { _id: '4', amount: 100, category: 'entertainment', createdAt: new Date('2023-01-02'), payment_way: 'cash', type: 'expense' },
    { _id: '5', amount: 200, category: 'groceries', createdAt: new Date('2023-01-02'), payment_way: 'cash', type: 'expense' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        {children}
    </QueryClientProvider>
);

describe("useTransactions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return transactions on success', async () => {
        (getTransactions as jest.Mock).mockResolvedValue({ success: true, data: mockTransactions, message: 'Fetched transactions' });

        const { result } = await renderHook(() => useTransactions(), { wrapper });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(mockTransactions);
    });

    it('sets isError on API failure', async () => {
        (getTransactions as jest.Mock).mockResolvedValue({ success: false, message: 'Failed to fetch transactions', data: [] });

        const { result } = await renderHook(() => useTransactions(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});
