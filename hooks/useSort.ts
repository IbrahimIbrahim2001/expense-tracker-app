import type { transactionItem } from '@/types/transactions-item';
import type { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';

export type SortKey = 'date' | 'amount' | 'category' | 'payment_way' | 'income' | 'expense';

export interface SortOption {
    label: string;
    key: SortKey;
    icon: keyof typeof Ionicons.glyphMap;
}

export const sortOptions: SortOption[] = [
    { label: 'Date', key: 'date', icon: 'calendar-outline' },
    { label: 'Amount', key: 'amount', icon: 'cash-outline' },
    { label: 'Category', key: 'category', icon: 'list-outline' },
    { label: 'Payment way', key: 'payment_way', icon: 'wallet-outline' },
    { label: 'Income', key: 'income', icon: 'trending-up-outline' },
    { label: 'Expense', key: 'expense', icon: 'trending-down-outline' }
];

export const sortLabels: Record<SortKey, string> = {
    date: 'Newest First',
    amount: 'Highest Amount',
    category: 'A-Z',
    payment_way: 'Cash, Card, Bank',
    income: 'Income',
    expense: 'Expense'
};

export const useSort = (transactions: transactionItem[] | undefined) => {
    const [sortKey, setSortKey] = useState<SortKey>('date');

    const sorted = useMemo(() => {
        if (!transactions) return [];
        const copy = [...transactions];
        switch (sortKey) {
            case 'amount':
                copy.sort((a, b) => b.amount - a.amount);
                break;
            case 'category':
                copy.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 'payment_way':
                copy.sort((a, b) => a.payment_way.localeCompare(b.payment_way));
                break;
            case 'income':
                copy.sort((a, b) => b.type.localeCompare(a.type));
                break;
            case 'expense':
                copy.sort((a, b) => a.type.localeCompare(b.type));
                break;
            case 'date':
            default:
                copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                break;
        }
        return copy;
    }, [transactions, sortKey]);

    return { sorted, sortKey, setSortKey };
};
