import { useMemo, useState } from 'react';
import type { transactionItem } from '@/types/transactions-item';

export interface FilterState {
    type: 'all' | 'income' | 'expense';
    categories: string[];
    paymentWays: string[];
    amountMin: string;
    amountMax: string;
}

const defaultFilter: FilterState = {
    type: 'all',
    categories: [],
    paymentWays: [],
    amountMin: '',
    amountMax: '',
};

export const useFilter = (transactions: transactionItem[] | undefined) => {
    const [filters, setFilters] = useState<FilterState>(defaultFilter);

    const availableCategories = useMemo(() => {
        if (!transactions) return [];
        return [...new Set(transactions.map((t) => t.category))].sort();
    }, [transactions]);

    const availablePaymentWays = useMemo(() => {
        if (!transactions) return [];
        return [...new Set(transactions.map((t) => t.payment_way))].sort();
    }, [transactions]);

    const filtered = useMemo(() => {
        if (!transactions) return [];
        return transactions.filter((t) => {
            if (filters.type !== 'all' && t.type !== filters.type) return false;
            if (filters.categories.length > 0 && !filters.categories.includes(t.category)) return false;
            if (filters.paymentWays.length > 0 && !filters.paymentWays.includes(t.payment_way)) return false;
            if (filters.amountMin && t.amount < Number(filters.amountMin)) return false;
            if (filters.amountMax && t.amount > Number(filters.amountMax)) return false;
            return true;
        });
    }, [transactions, filters]);

    const toggleCategory = (cat: string) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter((c) => c !== cat)
                : [...prev.categories, cat],
        }));
    };

    const togglePaymentWay = (pw: string) => {
        setFilters((prev) => ({
            ...prev,
            paymentWays: prev.paymentWays.includes(pw)
                ? prev.paymentWays.filter((p) => p !== pw)
                : [...prev.paymentWays, pw],
        }));
    };

    const hasActiveFilters =
        filters.type !== 'all' ||
        filters.categories.length > 0 ||
        filters.paymentWays.length > 0 ||
        filters.amountMin !== '' ||
        filters.amountMax !== '';

    const resetFilters = () => setFilters(defaultFilter);

    const activeFilterCount = [
        filters.type !== 'all',
        filters.categories.length > 0,
        filters.paymentWays.length > 0,
        filters.amountMin !== '',
        filters.amountMax !== '',
    ].filter(Boolean).length;

    return {
        filters,
        setFilters,
        filtered,
        availableCategories,
        availablePaymentWays,
        toggleCategory,
        togglePaymentWay,
        hasActiveFilters,
        activeFilterCount,
        resetFilters,
    };
};
