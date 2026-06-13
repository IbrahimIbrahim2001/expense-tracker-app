import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

export default function RecentTransactions() {
    return (
        <View className='gap-y-4'>
            <View className='w-full flex flex-row justify-between items-center'>
                <Text className='opacity-70 text-md'>Recent Transactions</Text>
                <View className={`flex flex-row gap-x-2 items-center  h-10 px-5 border rounded-3xl border-primary-500/50`}>
                    <Text className="text-white/70 text-sm font-semibold">
                        See All
                    </Text>
                    <Ionicons name="chevron-forward" size={12} color={"white"} />
                </View>
            </View>
            <View className='flex flex-row justify-between items-center'>
                <View className='flex flex-row gap-x-3'>
                    <View className='bg-category-food size-16 rounded-md items-center justify-center'>
                        <Ionicons name="restaurant" size={24} color={"white"} />
                    </View>
                    <View>
                        <Text className='text-lg'>
                            Food
                        </Text>
                        <Text className='text-md opacity-50'>
                            Card
                        </Text>
                    </View>
                </View>
                <View>
                    <Text className='text-lg self-end'>-8$</Text>
                    <Text className='text-md opacity-50'>
                        {new Date().toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </Text>
                </View>
            </View>
        </View>
    )
}