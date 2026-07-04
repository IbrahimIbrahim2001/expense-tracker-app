import { transactionItem } from '@/types/transactions-item';
import { act, renderHook } from '@testing-library/react-native';
import { useFilter } from '../useFilter';

const transactions: transactionItem[] = [
    { _id: '1', category: 'food', type: 'expense', amount: 50, payment_way: 'cash', createdAt: new Date() },
    { _id: '2', category: 'salary', type: 'income', amount: 1000, payment_way: 'bank account', createdAt: new Date() },
];

describe('useFilter', () => {
    it('returns all transactions by default', async () => {
        const { result } = await renderHook(() => useFilter(transactions));
        expect(result.current.filtered).toHaveLength(2);
    });

    it('filters by type', async () => {
        const { result } = await renderHook(() => useFilter(transactions));
        await act(() => result.current.setFilters(prev => ({ ...prev, type: 'income' })));
        expect(result.current.filtered).toHaveLength(1);
        expect(result.current.filtered[0].type).toBe('income');
    });

    it('resets filters', async () => {
        const { result } = await renderHook(() => useFilter(transactions));
        await act(() => result.current.setFilters(prev => ({ ...prev, type: 'expense' })));
        expect(result.current.filtered).toHaveLength(1);
        await act(() => result.current.resetFilters());
        expect(result.current.filtered).toHaveLength(2);
    });
});
