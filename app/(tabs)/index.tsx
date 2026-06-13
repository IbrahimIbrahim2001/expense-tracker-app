import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const filtersArray = [{
    id: 1,
    name: "All",
    active: true,
}, {
    id: 2,
    name: "Daily",
    active: false,
}, {
    id: 3,
    name: "Weekly",
    active: false,
}, {
    id: 4,
    name: "Monthly",
    active: false,
}, {
    id: 5,
    name: "Yearly",
    active: false,
}]

export default function HomeScreen() {
    return (
        <SafeAreaView className='flex-1 bg-[#2a4b8c]' >
            <ScrollView contentContainerClassName="flex items-start justify-start m-8">
                {/* Header */}
                <View className='w-full flex flex-row justify-between items-center'>
                    {/* Hello user section */}
                    <View className="flex flex-col">
                        <Text className="text-3xl text-white/90" >
                            Hello,
                        </Text>
                        <Text className="text-4xl font-bold text-white">
                            Ibrahim
                        </Text>
                    </View>
                    {/* Icon section */}
                    <View className="p-3 rounded-full border border-primary-500/40" >
                        <Ionicons name="notifications" size={20} color={"white"} className='border-white' />
                    </View>
                </View>
                {/* filter section (Horizontal Scroll)*/}
                <View className="-mx-8 mt-6 h-10 mb-8">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bounces
                        decelerationRate="fast"
                        contentContainerClassName="px-8 gap-3"
                    >
                        {filtersArray.map((item) => (
                            <View key={item.id} className={`h-10 px-5 border  rounded-3xl justify-center items-center ${item.active ? "bg-black" : "border-primary-500"}`}>
                                <Text className="text-white text-sm font-semibold">{item.name}</Text>
                            </View>
                        ))
                        }
                    </ScrollView>
                </View>
                {/* Income & Spent chart */}
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
                {/* Recent Transactions */}
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
            </ScrollView>
        </SafeAreaView >
    )
}