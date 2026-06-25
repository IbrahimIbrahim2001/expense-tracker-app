import FilterSection, { type FilterPeriod, periodMap } from '@/components/home/filter-section';
import Header from '@/components/home/header';
import IncomeAndSpentChart from '@/components/home/income-and-spent-chart';
import RecentTransactions from '@/components/home/recent-transactions';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const queryClient = useQueryClient()
    const [isRefetching, setIsRefetching] = useState(false)
    const [period, setPeriod] = useState<FilterPeriod>("All")

    const onRefresh = useCallback(async () => {
        setIsRefetching(true)
        await queryClient.invalidateQueries({ queryKey: ['transactions'] })
        await queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        setIsRefetching(false)
    }, [queryClient])

    const periodParam = periodMap[period]

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            <ScrollView
                className="flex-1"
                contentContainerClassName="p-5 pb-24"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#fff" />
                }
            >
                <Header />
                <FilterSection selected={period} onSelect={setPeriod} />
                <IncomeAndSpentChart period={periodParam} />
                <RecentTransactions />
            </ScrollView>
        </SafeAreaView >
    )
}