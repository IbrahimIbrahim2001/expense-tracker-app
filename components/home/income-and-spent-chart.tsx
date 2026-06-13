import { Text, View } from 'react-native'

export default function IncomeAndSpentChart() {
    return (
        <View className='flex w-full h-56 flex-row justify-between px-4 pt-8 bg-[#162544] rounded-2xl mb-8'>
            <View className='flex gap-y-2'>
                <View>
                    <View className="flex-row items-center gap-1">
                        <View className="h-6 w-2 bg-income-700 rounded-full" />
                        <Text className="text-lg opacity-90">
                            Income
                        </Text>
                    </View>
                    <Text className='text-3xl font-semibold pl-3'>300$</Text>
                </View>
                <View>
                    <View className="flex-row items-center gap-1">
                        <View className="h-6 w-2 bg-expense-700 rounded-full" />
                        <Text className="text-lg opacity-90">
                            Spent
                        </Text>
                    </View>
                    <Text className='text-3xl font-semibold pl-3'>250$</Text>
                </View>
            </View>
            <Text>Chart</Text>
        </View>
    )
}