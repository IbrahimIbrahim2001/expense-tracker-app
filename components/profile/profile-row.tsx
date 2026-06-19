import React from 'react'
import { Text, View } from 'react-native'

interface ProfileRowProps {
    label: string
    value: string
}

export default function ProfileRow({ label, value }: ProfileRowProps) {
    return (
        <View className="flex-row justify-between py-3 border-b border-white/10">
            <Text className="text-white/60 text-base">{label}</Text>
            <Text className="text-white text-base font-medium">{value}</Text>
        </View>
    )
}
