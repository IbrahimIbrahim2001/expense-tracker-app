import { SkeletonBlock } from './transaction-skeleton'
import { View } from 'react-native'

export function BudgetSkeleton() {
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
