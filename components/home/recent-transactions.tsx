import { useTransactions } from '@/hooks/useTransactions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from 'react-native';
import TransactionsItem from './transactions-item';

export default function RecentTransactions() {
    const { data: transactions, isLoading, isError } = useTransactions(5);

    return (
        <View className='gap-y-4'>
            <View className='w-full flex flex-row justify-between items-center'>
                <Text className='text-white opacity-70 text-md'>Recent Transactions</Text>
                <View className={`flex flex-row gap-x-2 items-center h-10 px-3 border rounded-3xl border-primary-500/50`}>
                    <Text className="text-white/70 text-sm">
                        See All
                    </Text>
                    <Ionicons name="chevron-forward" size={12} color={"white"} />
                </View>
            </View>
            {isLoading ? (
                <ActivityIndicator color="#fff" className="py-8" />
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