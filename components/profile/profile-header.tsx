import { User } from '@/types/user';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

interface ProfileHeaderProps {
    user: User
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    const { firstName, lastName, username, avatar } = user;
    const initial = firstName?.charAt(0)?.toUpperCase() || username?.charAt(0)?.toUpperCase() || '?'
    const avatarUrl = avatar?.startsWith('http') ? avatar : `${API_URL}${avatar}`;

    return (
        <View className="items-center mb-10 mt-5 ">
            <View className="size-24 rounded-full bg-primary-500 items-center justify-center mb-4 overflow-hidden relative">
            {avatar ? (
                    <Image
                        source={{ uri: avatarUrl }}
                        style={{ width: 96, height: 96 }}
                        contentFit="cover"
                    />
                ) : (
                    <Text className="text-4xl font-bold text-white">{initial}</Text>
            )}
                <View className="absolute bottom-0 right-0 bg-[#2a4b8c] rounded-full p-1">
                    <Ionicons name="camera" size={14} color="white" />
                </View>
            </View>
            <Text className="text-2xl font-bold text-white">
                {firstName || ''} {lastName || ''}
            </Text>
            <Text className="text-base text-white/60 mt-1">@{username}</Text>
        </View>
    )
}