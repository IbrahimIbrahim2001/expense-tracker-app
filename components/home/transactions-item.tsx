import { categoryColors, categoryIcons } from '@/lib/constants';
import { transactionItem } from '@/types/transactions-item';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

interface TransactionsItemProps {
    item: transactionItem
}

export default function TransactionsItem({ item }: TransactionsItemProps) {
    const iconName = categoryIcons[item.category] ?? "ellipsis-horizontal";
    const bgColor = categoryColors[item.category] ?? "#78716c";
    const isExpenses = item.type === "expense";
    const amountColor = isExpenses ? "text-red-500" : "text-green-400";
    return (
        <View className='flex flex-row justify-between items-center my-2'>
            <View className='flex flex-row gap-x-3'>
                <View className="size-16 rounded-xl items-center justify-center" style={{ backgroundColor: bgColor }}>
                    <Ionicons name={iconName} size={28} color={"white"} />
                </View>
                <View>
                    <Text className='capitalize  text-lg font-medium'>
                        {item.category}
                    </Text>
                    <Text className='text-white text-md opacity-50'>
                        {item.payement_way}
                    </Text>
                </View>
            </View>
            <View>
                <Text className={`text-lg self-end font-medium ${amountColor}`}> {isExpenses ? "-" : "+"}{item.amount}$</Text>
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