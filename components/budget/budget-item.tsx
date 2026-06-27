import { budget } from '@/types/budget'
import { Pressable, Text, View } from 'react-native'

interface BudgetItemProps {
    item: budget
    onPress?: (item: budget) => void
}

export default function BudgetItem({ item, onPress }: BudgetItemProps) {
    const barColor = item.percentage > 80 ? '#ef4444' : item.percentage > 50 ? '#f59e0b' : '#22c55e'

    return (
        <Pressable
            className="bg-[#162544] rounded-2xl p-5 mb-4"
            onPress={() => onPress?.(item)}
        >
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
        </Pressable>
    )
}
