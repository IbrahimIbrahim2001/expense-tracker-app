import { changePassword } from '@/api/change-password'
import { changePasswordSchema, ChangePasswordSchemaType } from '@/schemas/change-password-schema'
import { saveToken } from '@/lib/token'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChangePasswordScreen() {
    const [snackbar, setSnackbar] = useState({ visible: false, message: '' })
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    })

    const watchCurrent = useWatch({ control, name: 'currentPassword' })
    const watchNew = useWatch({ control, name: 'newPassword' })
    const watchConfirm = useWatch({ control, name: 'confirmPassword' })

    const onSubmit = async (data: ChangePasswordSchemaType) => {
        const res = await changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        })

        if (res.success) {
            await saveToken(res.data.token)
            setSnackbar({ visible: true, message: res.message })
            reset()
        } else {
            setSnackbar({ visible: true, message: res.message })
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            <ScrollView className="flex-1" contentContainerClassName="p-5 pb-24 gap-y-6">
                <PasswordField
                    control={control}
                    name="currentPassword"
                    label="Current Password"
                    placeholder="Enter current password"
                    show={showCurrent}
                    onToggle={() => setShowCurrent((p) => !p)}
                    hasValue={(watchCurrent?.length ?? 0) > 0}
                    error={errors.currentPassword?.message}
                />

                <PasswordField
                    control={control}
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter new password"
                    show={showNew}
                    onToggle={() => setShowNew((p) => !p)}
                    hasValue={(watchNew?.length ?? 0) > 0}
                    error={errors.newPassword?.message}
                />

                <PasswordField
                    control={control}
                    name="confirmPassword"
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    show={showConfirm}
                    onToggle={() => setShowConfirm((p) => !p)}
                    hasValue={(watchConfirm?.length ?? 0) > 0}
                    error={errors.confirmPassword?.message}
                />

                <Pressable
                    className="auth_button"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="auth_button_text">
                        {isSubmitting ? 'Changing...' : 'Change Password'}
                    </Text>
                </Pressable>
            </ScrollView>

            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ visible: false, message: '' })}
                duration={2000}
            >
                {snackbar.message}
            </Snackbar>
        </SafeAreaView>
    )
}

function PasswordField({
    control,
    name,
    label,
    placeholder,
    show,
    onToggle,
    hasValue,
    error,
}: {
    control: any
    name: 'currentPassword' | 'newPassword' | 'confirmPassword'
    label: string
    placeholder: string
    show: boolean
    onToggle: () => void
    hasValue: boolean
    error?: string
}) {
    return (
        <View>
            <Text className="text-white/70 text-sm mb-2">{label}</Text>
            <View className="relative">
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="auth_input py-5 min-h-[56px] pr-14"
                            placeholder={placeholder}
                            placeholderTextColor="#94a3b8"
                            secureTextEntry={!show}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {hasValue && (
                    <Pressable
                        onPress={onToggle}
                        className="absolute right-3 top-4"
                    >
                        <MaterialCommunityIcons
                            name={show ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#6366f1"
                        />
                    </Pressable>
                )}
            </View>
            {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
        </View>
    )
}
