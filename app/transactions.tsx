import TransactionsItem from '@/components/home/transactions-item';
import { useTransactions } from '@/hooks/useTransactions';
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionsScreen() {
    const { data: transactions, isLoading, isError } = useTransactions();

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            {isLoading ? (
                <ActivityIndicator color="#fff" className="flex-1" />
            ) : isError ? (
                <Text className="text-red-400 text-center flex-1  pt-20">Failed to load transactions</Text>
            ) : (
                <FlashList
                    data={transactions}
                    renderItem={({ item }) => <TransactionsItem item={item} />}
                    contentContainerClassName="px-4 pb-8"
                />
            )}
        </SafeAreaView>
    );
}
