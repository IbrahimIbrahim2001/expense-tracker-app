import EditProfileForm from '@/components/profile/edit-profile-form'
import ProfileHeader from '@/components/profile/profile-header'
import ProfileInfo from '@/components/profile/profile-info'
import { useAuthStore } from '@/store/auth-store'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
    const { user, logout } = useAuthStore()
    const [isEditing, setIsEditing] = useState(false)

    if (!user) return null

    const handleLogout = () => {
        logout()
        router.replace('/(auth)')
    }

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            <ScrollView className="flex-1" contentContainerClassName="p-5 pb-12">
                <ProfileHeader user={user} />

                {isEditing ? (
                    <EditProfileForm
                        user={user}
                        onSuccess={() => setIsEditing(false)}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <>
                        <ProfileInfo user={user} />

                        <Pressable
                            className="bg-primary-500 py-4 rounded-xl items-center mb-4"
                            onPress={() => setIsEditing(true)}
                        >
                            <Text className="text-white font-semibold text-lg">Edit Profile</Text>
                        </Pressable>

                        <Pressable
                            className="bg-red-500 py-4 rounded-xl items-center"
                            onPress={handleLogout}
                        >
                            <Text className="text-white font-semibold text-lg">Logout</Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
