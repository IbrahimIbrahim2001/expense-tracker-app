import { getBudgets } from '@/api/get-budgets';
import { budget } from '@/types/budget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useBudgets } from '../useBudgets';

jest.mock('@/api/get-budgets');

const mockBudgets : budget[] = [
    { id: '1', category: 'food', limit: 500, spent: 200, remaining: 300, percentage: 40 },
    { id: '2', category: 'transport', limit: 1000, spent: 1000, remaining: 0, percentage: 100 },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        {children}
    </QueryClientProvider>
);

describe('useBudgets', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns budgets on success', async () => {
        (getBudgets as jest.Mock).mockResolvedValue({ success: true, data: mockBudgets, message: 'Fetched budgets' });

        const { result } = await renderHook(() => useBudgets(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(mockBudgets);
    });

    it('sets isError on API failure', async () => {
        (getBudgets as jest.Mock).mockResolvedValue({ success: false, message: 'Failed to fetch budgets', data: [] });

        const { result } = await renderHook(() => useBudgets(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});
