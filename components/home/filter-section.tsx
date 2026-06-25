import { type DashboardPeriod } from '@/types/dashboard'
import { Pressable, ScrollView, Text, View } from 'react-native'

const filtersArray = ["All", "Daily", "Weekly", "Monthly", "Yearly"] as const
export type FilterPeriod = typeof filtersArray[number]

export const periodMap = {
    All: undefined,
    Daily: "daily" as const,
    Weekly: "weekly" as const,
    Monthly: "monthly" as const,
    Yearly: "yearly" as const,
} satisfies Record<FilterPeriod, DashboardPeriod | undefined>

export default function FilterSection({ selected, onSelect }: { selected: FilterPeriod; onSelect: (period: FilterPeriod) => void }) {
    return (
        <View className="-mx-8 mt-6 h-10 mb-8">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces
                decelerationRate="fast"
                contentContainerClassName="px-8 gap-3"
            >
                {filtersArray.map((name) => {
                    const active = name === selected
                    return (
                        <Pressable
                            key={name}
                            onPress={() => onSelect(name)}
                            className={`h-10 px-5 border rounded-3xl justify-center items-center ${active ? "bg-black" : "border-primary-500"}`}
                        >
                            <Text className="text-white text-sm font-semibold">{name}</Text>
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}