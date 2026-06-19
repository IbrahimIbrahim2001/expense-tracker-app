import { User } from '@/types/user'
import React from 'react'
import { View } from 'react-native'
import ProfileRow from './profile-row'

interface ProfileInfoProps {
    user: User
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
    const { email, username, firstName, lastName, address } = user

    return (
        <View className="bg-primary-500/20 rounded-xl p-5 mb-6">
            <ProfileRow label="Email" value={email || '—'} />
            <ProfileRow label="Username" value={username || '—'} />
            <ProfileRow label="First Name" value={firstName || '—'} />
            <ProfileRow label="Last Name" value={lastName || '—'} />
            <ProfileRow label="Address" value={address || '—'} />
        </View>
    )
}
