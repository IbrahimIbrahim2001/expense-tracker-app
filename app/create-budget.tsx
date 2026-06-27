import { createBudget } from '@/api/create-budget'
import { categoryColors, categoryIcons } from '@/lib/constants'
import { budgetSchema, BudgetSchemaType } from '@/schemas/budget-schema'
import { categories } from '@/schemas/transaction-schema'
import Ionicons from '@expo/vector-icons/Ionicons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { Menu, Snackbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CreateBudgetScreen() {
    const queryClient = useQueryClient()
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BudgetSchemaType>({
        defaultValues: {
            category: undefined,
            limit: "",
        },
        resolver: zodResolver(budgetSchema),
    })

    const onSubmit = async (data: BudgetSchemaType) => {
        const payload = { category: data.category, limit: Number(data.limit) }
        const res = await createBudget(payload)

        if (res.success) {
            setSnackbarMessage(res.message)
            setSnackbarVisible(true)
            queryClient.invalidateQueries({ queryKey: ["budgets"] })
            setTimeout(() => router.back(), 500)
        } else {
            setSnackbarMessage(res.message)
            setSnackbarVisible(true)
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            <View className="flex-1 p-5">
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    <View className="gap-y-5">
                        {/* Category selector */}
                        <View>
                            <Text className="text-white/70 text-sm mb-2">Category</Text>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <Menu
                                        visible={categoryMenuVisible}
                                        onDismiss={() => setCategoryMenuVisible(false)}
                                        anchor={
                                            <Pressable
                                                className="bg-primary-500/10 border border-slate-300/30 rounded-xl px-4 py-4 flex-row items-center justify-between"
                                                onPress={() => setCategoryMenuVisible(true)}
                                            >
                                                <View className="flex-row items-center gap-x-3">
                                                    {value ? (
                                                        <>
                                                            <Ionicons name={categoryIcons[value]} size={20} color={categoryColors[value]} />
                                                            <Text className="text-white capitalize">{value}</Text>
                                                        </>
                                                    ) : (
                                                        <Text className="text-white/50">Select a category</Text>
                                                    )}
                                                </View>
                                                <Ionicons name="chevron-down" size={18} color="#94a3b8" />
                                            </Pressable>
                                        }
                                    >
                                        {categories.map((cat) => (
                                            <Menu.Item
                                                key={cat}
                                                onPress={() => {
                                                    onChange(cat)
                                                    setCategoryMenuVisible(false)
                                                }}
                                                title={cat}
                                                leadingIcon={() => (
                                                    <Ionicons name={categoryIcons[cat]} size={20} color={categoryColors[cat]} />
                                                )}
                                                titleStyle={{ textTransform: "capitalize" }}
                                            />
                                        ))}
                                    </Menu>
                                )}
                            />
                            {errors.category && (
                                <Text className="text-red-400 text-sm mt-1">{errors.category.message}</Text>
                            )}
                        </View>

                        {/* Limit */}
                        <View>
                            <Text className="text-white/70 text-sm mb-2">Monthly Limit</Text>
                            <Controller
                                control={control}
                                name="limit"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-primary-500/10 border border-slate-300/30 rounded-xl px-4 py-4 text-white"
                                        placeholder="500"
                                        placeholderTextColor="#94a3b8"
                                        keyboardType="decimal-pad"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.limit && (
                                <Text className="text-red-400 text-sm mt-1">{errors.limit.message}</Text>
                            )}
                        </View>

                        {/* Submit */}
                        <Pressable
                            className="bg-[#3b82f6] py-4 rounded-xl items-center mt-2"
                            onPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        >
                            <Text className="text-white font-bold text-lg">
                                {isSubmitting ? "Creating..." : "Create Budget"}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <Snackbar
                    className='mb-5'
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={2000}
                >
                    {snackbarMessage}
                </Snackbar>
            </View>
        </SafeAreaView>
    )
}
