import { TransactionListSkeleton } from '@/components/skeletons/transaction-skeleton';
import FilterBottomSheet from '@/components/filter-bottom-sheet';
import TransactionsItem from '@/components/home/transactions-item';
import SortModal from '@/components/sort-modal';
import { useFilter } from '@/hooks/useFilter';
import { sortLabels, sortOptions, useSort } from '@/hooks/useSort';
import { useTransactions } from '@/hooks/useTransactions';
import { useQueryClient } from '@tanstack/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { useCallback, useState } from 'react';
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionsScreen() {
    const queryClient = useQueryClient()
    const { data: transactions, isLoading, isError } = useTransactions();
    const [isRefetching, setIsRefetching] = useState(false)
    const {
        filters,
        setFilters,
        filtered,
        availableCategories,
        availablePaymentWays,
        hasActiveFilters,
        activeFilterCount,
        resetFilters,
    } = useFilter(transactions);
    const { sorted, sortKey, setSortKey } = useSort(filtered);
    const [sortVisible, setSortVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    const onRefresh = useCallback(async () => {
        setIsRefetching(true)
        await queryClient.invalidateQueries({ queryKey: ['transactions'] })
        setIsRefetching(false)
    }, [queryClient])

    return (
            <SafeAreaView className="flex-1 bg-[#2a4b8c]">
                {isLoading ? (
                    <View className="px-4 pt-4">
                        <TransactionListSkeleton count={8} />
                    </View>
                ) : isError ? (
                    <Text className="text-red-400 text-center flex-1 pt-20">Failed to load transactions</Text>
                ) : (
                    <>
                        <View className="flex-row items-center justify-between px-4 mb-2">
                            <TouchableOpacity
                                onPress={() => setFilterVisible(true)}
                                className="bg-white/15 rounded-full p-2 relative"
                            >
                                <Ionicons name="filter" size={20} color="white" />
                                {hasActiveFilters && (
                                    <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                                        <Text className="text-white text-[10px] font-bold">{activeFilterCount}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setSortVisible(true)}
                                className="flex-row items-center gap-1.5 bg-white/15 rounded-full px-3.5 py-2"
                            >
                                <Ionicons name="options-outline" size={16} color="white" />
                                <Text className="text-white/90 text-sm font-medium">{sortLabels[sortKey]}</Text>
                                <Ionicons name="chevron-down" size={14} color="white" />
                            </TouchableOpacity>
                        </View>

                        <SortModal
                            visible={sortVisible}
                            onClose={() => setSortVisible(false)}
                            options={sortOptions}
                            selected={sortKey}
                            onSelect={setSortKey}
                        />

                        <FilterBottomSheet
                            visible={filterVisible}
                            onClose={() => setFilterVisible(false)}
                            filters={filters}
                            setFilters={setFilters}
                            availableCategories={availableCategories}
                            availablePaymentWays={availablePaymentWays}
                            onReset={resetFilters}
                            hasActiveFilters={hasActiveFilters}
                        />

                        <FlashList
                            data={sorted}
                            renderItem={({ item }) => <TransactionsItem item={item} />}
                            contentContainerClassName="px-4 pb-8"
                            refreshControl={
                                <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#fff" />
                            }
                        />
                    </>
                )}
            </SafeAreaView>
    );
}
