import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text, TextInput, View } from 'react-native'
import { z } from 'zod'

const profileSchema = z.object({
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    address: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface EditProfileFormProps {
    user: User
    onSave: (data: ProfileFormData) => void
    onCancel: () => void
}

export default function EditProfileForm({ user, onSave, onCancel }: EditProfileFormProps) {
    const { firstName, lastName, address } = user
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        defaultValues: { firstName, lastName, address },
        resolver: zodResolver(profileSchema),
    })

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
                            value={value}
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
                            value={value}
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
                            value={value}
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
                    onPress={handleSubmit(onSave)}
                >
                    <Text className="text-white font-bold text-lg">Save</Text>
                </Pressable>
            </View>
        </View>
    )
}
