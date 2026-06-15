import FilterSection from '@/components/home/filter-section';
import Header from '@/components/home/header';
import IncomeAndSpentChart from '@/components/home/income-and-spent-chart';
import RecentTransactions from '@/components/home/recent-transactions';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            <ScrollView
                className="flex-1"
                contentContainerClassName="p-5 pb-24"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Header />
                {/* filter section (Horizontal Scroll)*/}
                <FilterSection />
                {/* Income & Spent chart */}
                <IncomeAndSpentChart />
                {/* Recent Transactions */}
                <RecentTransactions />
            </ScrollView>
        </SafeAreaView >
    )
}