import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function SignupScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className='auth_container'>
                <View className="items-center mb-8">
                    <Text className="auth_heading">
                        Create Account
                    </Text>
                    <Text className="auth_subheading">
                        Join us and start your journey today
                    </Text>
                </View>
                <View className="w-full gap-y-4 px-4 mb-4">
                    <TextInput
                        className="auth_input"
                        placeholder="Username"
                        keyboardAppearance='default'
                    />
                    <TextInput
                        className="auth_input"
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        className="auth_input"
                        placeholder="password"
                        keyboardType="visible-password"
                    />
                    <Pressable className="auth_button">
                        <Text className="auth_button_text">
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
                <View className="self-end gap-x-2 my-2 mx-6">
                    <Text className="text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-primary-300">
                            Sign in
                        </Link>
                    </Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}