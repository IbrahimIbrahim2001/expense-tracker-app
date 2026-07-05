import { TransactionListSkeleton } from '@/components/skeletons/transaction-skeleton';
import { RECENT_TRANSACTIONS_LIMIT, useTransactions } from '@/hooks/useTransactions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import TransactionsItem from './transactions-item';

export default function RecentTransactions() {
    const { data: transactions, isLoading, isError } = useTransactions(RECENT_TRANSACTIONS_LIMIT);

    return (
            <View className='gap-y-4'>
            <View className='w-full flex flex-row justify-between items-center'>
                <Text className='text-white opacity-70 text-md'>Recent Transactions</Text>
                <Pressable
                    className='flex flex-row gap-x-2 items-center h-10 px-3 border rounded-3xl border-primary-500/50'
                    onPress={() => router.push("/transactions" as any)}
                >
                    <Text className="text-white/70 text-sm">
                        See All
                    </Text>
                    <Ionicons name="chevron-forward" size={12} color={"white"} />
                </Pressable>
            </View>
            {isLoading ? (
                <TransactionListSkeleton count={5} />
            ) : isError ? (
                <Text className="text-red-400 text-center py-8">Failed to load transactions</Text>
            ) : (
                <FlashList
                    data={transactions}
                    renderItem={({ item }) => <TransactionsItem item={item} />}
                />
            )}
        </View >
    )
}