import { reactivationSchema, ReactivationSchemaType } from '@/schemas/reactivation-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Pressable, Text, TextInput, View } from 'react-native'
import { Snackbar } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function ReactivateScreen() {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReactivationSchemaType>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(reactivationSchema),
    })

    const onSubmit = async (data: ReactivationSchemaType) => {
        console.log("Reactivate account data:", data)
        setSnackbarMessage("Reactivation link sent to email")
        setSnackbarVisible(true)
        reset()
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className='auth_container'>
                <View className="items-center mb-8">
                    <Text className="auth_heading">
                        Reactivate Account
                    </Text>
                    <Text className="auth_subheading">
                        Enter your email to receive a reactivation link
                    </Text>
                </View>
                <View className="w-full gap-y-4 mb-4">
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className='auth_input'
                                placeholder="Email address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="email"
                    />

                    {errors.email && (
                        <Text className="auth_input_error">
                            {errors.email.message}
                        </Text>
                    )}
                    <Pressable className="auth_button" onPress={handleSubmit(onSubmit)}>
                        <Text className="auth_button_text">
                            {isSubmitting ? "Sending..." : "Send Reactivation Link"}
                        </Text>
                    </Pressable>

                </View>
                <View className="self-end gap-x-2 my-2 mx-6">
                    <Text className="text-slate-400">
                        Remember your account?{" "}
                        <Link href="/login" className="font-semibold text-primary-300">
                            Sign in
                        </Link>
                    </Text>
                </View>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={1500}
                >
                    {snackbarMessage}
                </Snackbar>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
