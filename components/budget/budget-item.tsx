import { budget } from '@/types/budget'
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import DeleteBudgetDialog from './delete-budget-dialog'
import EditBudgetDialog from './edit-budget-dialog'
import SwipeableRow from './swipeable-row'

interface BudgetItemProps {
    item: budget
}

export default function BudgetItem({ item }: BudgetItemProps) {
    const [editVisible, setEditVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const barColor = item.percentage > 80 ? '#ef4444' : item.percentage > 50 ? '#f59e0b' : '#22c55e'

    return (
        <>
            <SwipeableRow onDelete={() => setDeleteVisible(true)}>
                <Pressable
                    className="bg-[#162544] rounded-2xl p-5 mb-4"
                    onPress={() => setEditVisible(true)}
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
            </SwipeableRow>
            <EditBudgetDialog item={item} visible={editVisible} onDismiss={() => setEditVisible(false)} />
            <DeleteBudgetDialog
                budget={item}
                visible={deleteVisible}
                onDismiss={() => setDeleteVisible(false)}
            />
        </>
    )
}
