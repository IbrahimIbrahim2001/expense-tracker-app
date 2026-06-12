import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function HomeScreen() {
    return (
        <View className='flex-1 items-center justify-center bg-[#2a4b8c]'>
            <Text>index</Text>
            <Link href="/settings" className='text-blue-500'>Go to settings</Link>
        </View>
    )
}