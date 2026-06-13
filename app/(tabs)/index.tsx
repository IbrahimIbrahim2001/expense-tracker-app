import FilterSection from '@/components/home/filter-section';
import Header from '@/components/home/header';
import IncomeAndSpentChart from '@/components/home/income-and-spent-chart';
import RecentTransactions from '@/components/home/recent-transactions';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView className='flex-1 bg-[#2a4b8c]' >
            <ScrollView contentContainerClassName="flex items-start justify-start m-8">
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