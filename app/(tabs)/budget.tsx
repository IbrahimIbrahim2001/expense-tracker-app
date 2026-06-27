import { BudgetSkeleton } from '@/components/skeletons/budget-skeleton'
import BudgetItem from '@/components/budget/budget-item'
import { useBudgets } from '@/hooks/useBudgets'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FlashList } from '@shopify/flash-list'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BudgetScreen() {
     const queryClient = useQueryClient()
     const [isRefetching, setIsRefetching] = useState(false)
    const { data: budgets, isLoading, isError } = useBudgets()

    const onRefresh = useCallback(async () => {
           setIsRefetching(true)
           await queryClient.invalidateQueries({ queryKey: ['budgets'] })
           setIsRefetching(false)
       }, [queryClient])
   

    return (
           <SafeAreaView className="flex-1 bg-[#2a4b8c] pb-22" >
            <View className="flex-1 px-5 pt-4">
                <Text className="text-white text-2xl font-bold mb-6">Budget</Text>

                {isLoading ? (
                    <View>
                        <BudgetSkeleton />
                        <BudgetSkeleton />
                        <BudgetSkeleton />
                    </View>
                ) : isError ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-red-400 text-center">Failed to load budgets</Text>
                    </View>
                ) : !budgets || budgets.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-white/60 text-center mb-4">No budgets set yet</Text>
                    </View>
                ) : (
                    <ScrollView
                                    className="flex-1"
                                    contentContainerClassName="pb-24"
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#fff" />
                                    }
                                >
                        <FlashList
                            data={budgets}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <BudgetItem item={item} />}
                        />
                </ScrollView>
                )}
            </View>

            <Pressable
                className="absolute bottom-28 right-6 bg-[#3b82f6] size-16 rounded-xl items-center justify-center shadow-lg z-50"
                onPress={() => router.navigate("/create-budget")}
            >
                <MaterialCommunityIcons name="plus-box" size={32} color="white" />
            </Pressable>
        </SafeAreaView>
    )
}
