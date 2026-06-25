import { useDashboard } from '@/hooks/useDashboard';
import { type DashboardPeriod } from '@/types/dashboard';
import { PieChart } from 'react-native-gifted-charts';
import { Text, View } from 'react-native';
import { SkeletonBlock } from '../skeletons/transaction-skeleton';

export default function IncomeAndSpentChart({ period }: { period?: Exclude<DashboardPeriod, "all"> }) {
    const { data, isLoading, isError } = useDashboard(period);

    if (isLoading) {
        return (
            <View className='w-full h-56 px-4 pt-8 bg-[#162544] rounded-2xl mb-8'>
                <View className='flex-row justify-between'>
                    <View className='gap-y-3'>
                        <SkeletonBlock className="h-5 w-16" />
                        <SkeletonBlock className="h-8 w-24" />
                        <SkeletonBlock className="h-5 w-16 mt-2" />
                        <SkeletonBlock className="h-8 w-24" />
                    </View>
                    <SkeletonBlock className="h-24 w-24 rounded-full" />
                </View>
            </View>
        )
    }

    if (isError) {
        return (
            <View className='w-full h-56 px-4 pt-8 bg-[#162544] rounded-2xl mb-8 items-center justify-center'>
                <Text className="text-red-400 text-center">Failed to load dashboard</Text>
            </View>
        )
    }

    const total = (data?.income ?? 0) + (data?.expense ?? 0)
    const incomePercent = total > 0 ? Math.round(((data?.income ?? 0) / total) * 100) : 0
    const expensePercent = total > 0 ? Math.round(((data?.expense ?? 0) / total) * 100) : 0

    return (
        <View className='w-full px-4 pt-8 pb-6 bg-[#162544] rounded-2xl mb-8'>
            <View className='flex-row justify-between items-center mb-6'>
                <View className='gap-y-3'>
                    <View>
                        <View className="flex-row items-center gap-1.5 mb-1">
                            <View className="h-3 w-3 rounded-full bg-income-500" />
                            <Text className="text-white/70 text-sm font-medium">Income</Text>
                        </View>
                        <Text className='text-white text-2xl font-bold pl-[18px]'>{data?.income.toLocaleString()}$</Text>
                    </View>
                    <View>
                        <View className="flex-row items-center gap-1.5 mb-1">
                            <View className="h-3 w-3 rounded-full bg-expense-500" />
                            <Text className="text-white/70 text-sm font-medium">Spent</Text>
                        </View>
                        <Text className='text-white text-2xl font-bold pl-[18px]'>{data?.expense.toLocaleString()}$</Text>
                    </View>
                </View>
                <View className='items-center justify-center'>
                    <PieChart
                        data={[
                            { value: data?.income ?? 0, color: '#22c55e' },
                            { value: data?.expense ?? 0, color: '#ef4444' },
                        ]}
                        donut
                        radius={65}
                        innerRadius={45}
                        strokeColor="#162544"
                        strokeWidth={4}
                        isThreeD={false}
                        showText
                        textColor="white"
                        textSize={14}
                        showTextBackground
                        textBackgroundColor="#162544"
                        textBackgroundRadius={6}
                        centerLabelComponent={() => (
                            <View className='items-center'>
                                <Text className='text-white/70 text-[10px]'>Balance</Text>
                                <Text className='text-white font-bold text-sm'>
                                    {data?.balance.toLocaleString()}$
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
            <View className='flex-row justify-between items-center px-2'>
                <View className='flex-row items-center gap-2'>
                    <View className='w-3 h-3 rounded-full bg-income-500' />
                    <Text className='text-white/60 text-xs'>{incomePercent}% income</Text>
                </View>
                <Text className='text-white/40 text-xs'>{data?.totalTransactions} transaction{data?.totalTransactions !== 1 ? 's' : ''}</Text>
                <View className='flex-row items-center gap-2'>
                    <Text className='text-white/60 text-xs'>{expensePercent}% expenses</Text>
                    <View className='w-3 h-3 rounded-full bg-expense-500' />
                </View>
            </View>
        </View>
    )
}
