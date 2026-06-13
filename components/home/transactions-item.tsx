import { categoryBgClasses, categoryIcons } from '@/lib/constants';
import { transactionItem } from '@/types/transactions-item';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

interface TransactionsItemProps {
    item: transactionItem
}

export default function TransactionsItem({ item }: TransactionsItemProps) {
    const iconName = categoryIcons[item.category] ?? "ellipsis-horizontal";
    const bgClass = categoryBgClasses[item.category] ?? "bg-category-other";
    const isExpenses = item.type === "expense";
    const amountColor = isExpenses ? "text-red-500" : "text-green-400";
    return (
        <View className='flex flex-row justify-between items-center'>
            <View className='flex flex-row gap-x-3'>
                <View className={`bg-category-food size-16 rounded-md items-center justify-center  ${bgClass}`}>
                    <Ionicons name={iconName} size={28} color={"white"} />
                </View>
                <View>
                    <Text className='capitalize text-white text-lg font-medium'>
                        {item.category}
                    </Text>
                    <Text className='text-white text-md opacity-50'>
                        {item.payement_way}
                    </Text>
                </View>
            </View>
            <View>
                <Text className={`text-white text-lg self-end font-medium ${amountColor}`}> {isExpenses ? "-" : "+"}{item.amount}$</Text>
                <Text className='text-white text-md opacity-50'>
                    {item.createdAt.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </Text>
            </View>
        </View>
    )
}