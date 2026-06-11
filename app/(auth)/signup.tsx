import { signup } from '@/api/signup'
import { signupSchema, SignupSchemaType } from '@/schemas/signup-schema'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm, useWatch } from "react-hook-form"
import { Pressable, Text, TextInput, View } from 'react-native'
import { Snackbar } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function SignupScreen() {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SignupSchemaType>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(signupSchema),
    })

    const watchPassword = useWatch({
        control,
        name: "password",
    })
    const onSubmit = async (data: SignupSchemaType) => {
        try {
            const res = await signup(data);
            console.log(res);

            setSnackbarMessage("Account created successfully");
            setSnackbarVisible(true);

            reset();

            setTimeout(() => {
                router.replace("/login");
            }, 1500);
        } catch (error) {
            setSnackbarMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to create account"
            );
            setSnackbarVisible(true);
        }
    };

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
                <View className="w-full gap-y-4 mb-4">
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className='auth_input'
                                placeholder="username"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="username"
                    />
                    {errors.username && (
                        <Text className="auth_input_error">
                            {errors.username.message}
                        </Text>
                    )}

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
                    <View className="relative">
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="auth_input pr-20"
                                    placeholder="password"
                                    secureTextEntry={!showPassword}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.password && (
                            <Text className="auth_input_error">
                                {errors.password.message}
                            </Text>
                        )}
                        {watchPassword.length > 0 &&
                            <Pressable
                                onPress={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-3"
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={24}
                                    color="#6366f1"
                                />
                            </Pressable>
                        }
                    </View>
                    <Pressable className="auth_button" onPress={handleSubmit(onSubmit)}>
                        <Text className="auth_button_text">
                            {isSubmitting ? "Loading..." : "Sign Up"}
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