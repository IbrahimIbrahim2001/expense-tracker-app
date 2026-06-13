import { ScrollView, Text, View } from 'react-native'

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

export default function FilterSection() {
    return (
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
    )
}