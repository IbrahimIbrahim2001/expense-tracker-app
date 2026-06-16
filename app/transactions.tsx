import TransactionsItem from '@/components/home/transactions-item';
import SortModal from '@/components/sort-modal';
import { useTransactions } from '@/hooks/useTransactions';
import { sortLabels, sortOptions, useSort } from '@/hooks/useSort';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionsScreen() {
    const { data: transactions, isLoading, isError } = useTransactions();
    const { sorted, sortKey, setSortKey } = useSort(transactions);
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            {isLoading ? (
                <ActivityIndicator color="#fff" className="flex-1" />
            ) : isError ? (
                <Text className="text-red-400 text-center flex-1 pt-20">Failed to load transactions</Text>
            ) : (
                <>
                    <View className="flex-row items-center justify-between px-4 mb-2">
                        <TouchableOpacity className="bg-white/15 rounded-full p-2">
                            <Ionicons name="filter" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMenuVisible(true)}
                            className="flex-row items-center gap-1.5 bg-white/15 rounded-full px-3.5 py-2"
                        >
                            <Ionicons name="options-outline" size={16} color="white" />
                            <Text className="text-white/90 text-sm font-medium">{sortLabels[sortKey]}</Text>
                            <Ionicons name="chevron-down" size={14} color="white" />
                        </TouchableOpacity>
                    </View>

                    <SortModal
                        visible={menuVisible}
                        onClose={() => setMenuVisible(false)}
                        options={sortOptions}
                        selected={sortKey}
                        onSelect={setSortKey}
                    />

                    <FlashList
                        data={sorted}
                        renderItem={({ item }) => <TransactionsItem item={item} />}
                        contentContainerClassName="px-4 pb-8"
                    />
                </>
            )}
        </SafeAreaView>
    );
}
