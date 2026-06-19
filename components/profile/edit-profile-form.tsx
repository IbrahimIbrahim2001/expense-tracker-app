import { updateProfile } from '@/api/update-profile'
import { profileSchema, ProfileSchemaType } from '@/schemas/profile-schema'
import { useAuthStore } from '@/store/auth-store'
import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text, TextInput, View } from 'react-native'
import { Snackbar } from 'react-native-paper'

interface EditProfileFormProps {
    user: User
    onSuccess: () => void
    onCancel: () => void
}

export default function EditProfileForm({ user, onSuccess, onCancel }: EditProfileFormProps) {
    const { setUser } = useAuthStore()
    const { firstName, lastName, address } = user
    const [snackbar, setSnackbar] = useState({ visible: false, message: '' })
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileSchemaType>({
        defaultValues: { firstName, lastName, address },
        resolver: zodResolver(profileSchema),
    })

    const onSubmit = async (data: ProfileSchemaType) => {
        const res = await updateProfile(data)

        if (res.success) {
            setUser({ ...user, ...data })
            onSuccess()
        } else {
            setSnackbar({ visible: true, message: res.message })
        }
    }

    return (
        <View className="gap-y-5">
            <View>
                <Text className="text-white/70 text-sm mb-2">First Name</Text>
                <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="transactions_input"
                            placeholder="Enter first name"
                            placeholderTextColor="#94a3b8"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value ?? ''}
                        />
                    )}
                />
                {errors.firstName && (
                    <Text className="text-red-400 text-sm mt-1">{errors.firstName.message}</Text>
                )}
            </View>

            <View>
                <Text className="text-white/70 text-sm mb-2">Last Name</Text>
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="transactions_input"
                            placeholder="Enter last name"
                            placeholderTextColor="#94a3b8"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value ?? ''}
                        />
                    )}
                />
                {errors.lastName && (
                    <Text className="text-red-400 text-sm mt-1">{errors.lastName.message}</Text>
                )}
            </View>

            <View>
                <Text className="text-white/70 text-sm mb-2">Address</Text>
                <Controller
                    control={control}
                    name="address"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="transactions_input"
                            placeholder="Enter address"
                            placeholderTextColor="#94a3b8"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value ?? ''}
                        />
                    )}
                />
                {errors.address && (
                    <Text className="text-red-400 text-sm mt-1">{errors.address.message}</Text>
                )}
            </View>

            <View className="flex-row gap-x-4 mt-4">
                <Pressable
                    className="flex-1 border border-slate-300 py-4 rounded-xl items-center"
                    onPress={onCancel}
                >
                    <Text className="text-white font-semibold text-lg">Cancel</Text>
                </Pressable>
                <Pressable
                    className="flex-1 bg-[#3b82f6] py-4 rounded-xl items-center"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-white font-bold text-lg">
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Text>
                </Pressable>
            </View>

            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ visible: false, message: '' })}
                duration={2000}
            >
                {snackbar.message}
            </Snackbar>
        </View>
    )
}
