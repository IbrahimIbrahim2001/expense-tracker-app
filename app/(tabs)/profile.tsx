import { useAuthStore } from '@/store/auth-store'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
    const { user, logout } = useAuthStore()

    const handleLogout = () => {
        logout()
        router.replace('/(auth)')
    }

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            <ScrollView className="flex-1" contentContainerClassName="p-5 pb-12">
                <View className="items-center mb-10 mt-5">
                    <View className="w-24 h-24 rounded-full bg-primary-500 items-center justify-center mb-4">
                        <Text className="text-4xl font-bold text-white">
                            {user?.firstName?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || '?'}
                        </Text>
                    </View>
                    <Text className="text-2xl font-bold text-white">
                        {user?.firstName || ''} {user?.lastName || ''}
                    </Text>
                    <Text className="text-base text-white/60 mt-1">@{user?.username}</Text>
                </View>

                <View className="bg-primary-500/20 rounded-xl p-5 mb-6">
                    <ProfileRow label="Email" value={user?.email || '—'} />
                    <ProfileRow label="Username" value={user?.username || '—'} />
                    <ProfileRow label="First Name" value={user?.firstName || '—'} />
                    <ProfileRow label="Last Name" value={user?.lastName || '—'} />
                    <ProfileRow label="Address" value={user?.address || '—'} />
                </View>

                <TouchableOpacity
                    className="bg-red-500 border border-red-500 rounded-xl py-4 items-center"
                    onPress={handleLogout}
                >
                    <Text className="text-white font-semibold text-lg">Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row justify-between py-3 border-b border-white/10">
            <Text className="text-white/60 text-base">{label}</Text>
            <Text className="text-white text-base font-medium">{value}</Text>
        </View>
    )
}
