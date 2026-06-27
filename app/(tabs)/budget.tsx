import { SkeletonBlock } from '@/components/skeletons/transaction-skeleton'
import { useBudgets } from '@/hooks/useBudgets'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FlashList } from '@shopify/flash-list'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

function BudgetSkeleton() {
    return (
        <View className="bg-[#162544] rounded-2xl p-5 mb-4">
            <SkeletonBlock className="h-5 w-24 mb-3" />
            <View className="flex-row justify-between mb-2">
                <SkeletonBlock className="h-4 w-16" />
                <SkeletonBlock className="h-4 w-16" />
            </View>
            <SkeletonBlock className="h-2 w-full rounded-full mt-2" />
        </View>
    )
}

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
                            renderItem={({ item }) => {
                                const barColor = item.percentage > 80 ? '#ef4444' : item.percentage > 50 ? '#f59e0b' : '#22c55e'
                                return (
                                    <View className="bg-[#162544] rounded-2xl p-5 mb-4">
                                        <Text className="text-white text-lg font-semibold capitalize mb-3">{item.category}</Text>
                                        <View className="flex-row justify-between mb-1">
                                            <Text className="text-white/60 text-sm">Spent: ${item.spent}</Text>
                                            <Text className="text-white/60 text-sm">Limit: ${item.limit}</Text>
                                        </View>
                                        <View className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                            <View
                                                className="h-full rounded-full"
                                                style={{ width: `${Math.min(item.percentage, 100)}%`, backgroundColor: barColor }}
                                            />
                                        </View>
                                        <View className="flex-row justify-between mt-2">
                                            <Text className="text-white/60 text-xs">
                                                {item.percentage}% used
                                            </Text>
                                            <Text className="text-white/80 text-xs font-semibold">
                                                ${item.remaining} remaining
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }}
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
