import { transactionItem } from "@/types/transactions-item";
import { act, renderHook } from "@testing-library/react-native";
import { useSort } from "../useSort";

const transactions: transactionItem[] = [
    { _id: '1', category: 'food', type: 'expense', amount: 50, payment_way: 'cash', createdAt: new Date('2024-01-01') },
    { _id: '2', category: 'salary', type: 'income', amount: 1000, payment_way: 'bank account', createdAt: new Date('2024-06-01') },
    { _id: '3', category: 'bills', type: 'expense', amount: 500, payment_way: 'card', createdAt: new Date('2024-03-01') },
];

describe('useSort', () => {
    it('sorts by date (newest first) by default', async () => {
        const { result } = await renderHook(() => useSort(transactions));
        expect(result.current.sorted[0]._id).toBe('2');
        expect(result.current.sorted[1]._id).toBe('3');
        expect(result.current.sorted[2]._id).toBe('1');
    });

    it('sorts by amount descending', async () => {
        const { result } = await renderHook(() => useSort(transactions));
        await act(() => result.current.setSortKey('amount'));
        expect(result.current.sorted[0].amount).toBe(1000);
        expect(result.current.sorted[1].amount).toBe(500);
        expect(result.current.sorted[2].amount).toBe(50);
    });

    it('sorts by category A-Z', async () => {
        const { result } = await renderHook(() => useSort(transactions));
        await act(() => result.current.setSortKey('category'));
        expect(result.current.sorted[0].category).toBe('bills');
        expect(result.current.sorted[1].category).toBe('food');
        expect(result.current.sorted[2].category).toBe('salary');
    });

    it('sorts by payment way alphabetically', async () => {
        const { result } = await renderHook(() => useSort(transactions));
        await act(() => result.current.setSortKey('payment_way'));
        expect(result.current.sorted[0].payment_way).toBe('bank account');
        expect(result.current.sorted[1].payment_way).toBe('card');
        expect(result.current.sorted[2].payment_way).toBe('cash');
    });

    it('prioritizes income over expense', async () => {
        const { result } = await renderHook(() => useSort(transactions));
        await act(() => result.current.setSortKey('income'));
        expect(result.current.sorted[0].type).toBe('income');
        expect(result.current.sorted[1].type).toBe('expense');
        expect(result.current.sorted[2].type).toBe('expense');
    });

    it('prioritizes expense over income', async () => {
        const { result } = await renderHook(() => useSort(transactions));
        await act(() => result.current.setSortKey('expense'));
        expect(result.current.sorted[0].type).toBe('expense');
        expect(result.current.sorted[1].type).toBe('expense');
        expect(result.current.sorted[2].type).toBe('income');
    });

    it('returns empty array for undefined', async () => {
        const { result } = await renderHook(() => useSort(undefined));
        expect(result.current.sorted).toEqual([]);
    });

    it('updates sort key state', async () => {
        const { result } = await renderHook(() => useSort(transactions));
        expect(result.current.sortKey).toBe('date');
        await act(() => result.current.setSortKey('amount'));
        expect(result.current.sortKey).toBe('amount');
    });
});