import { Text } from '@react-navigation/elements'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
    return (
        <SafeAreaView className='flex-1 items-center pt-20 bg-primary-950'>
            <Text>LoginScreen</Text>
        </SafeAreaView>
    )
}