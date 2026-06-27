import { addTransaction } from '@/api/add-transaction'
import { categoryColors, categoryIcons } from '@/lib/constants'
import { categories, paymentMethods, transactionSchema, TransactionSchemaType } from '@/schemas/transaction-schema'
import Ionicons from '@expo/vector-icons/Ionicons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { Menu, Snackbar } from 'react-native-paper'

export default function AddTransactionForm() {
    const queryClient = useQueryClient()
    const [selectedType, setSelectedType] = useState<"expense" | "income">("expense")
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TransactionSchemaType>({
        defaultValues: {
            category: undefined,
            amount: "",
            type: "expense",
            payment_way: "cash",
        },
        resolver: zodResolver(transactionSchema),
    })

    const onSubmit = async (data: TransactionSchemaType) => {
        const payload = { ...data, amount: Number(data.amount) }
        const res = await addTransaction(payload)

        if (res.success) {
            setSnackbarMessage(res.message)
            setSnackbarVisible(true)
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            queryClient.invalidateQueries({ queryKey: ["dashboard"] })
            reset()
            setSelectedType("expense")
            setTimeout(() => router.navigate("/transactions"), 500)
        } else {
            setSnackbarMessage(res.message)
            setSnackbarVisible(true)
        }
    }

    return (
        <View className="flex-1 ">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="gap-y-5">
                    {/* Type toggle */}
                    <View className="flex-row gap-x-4">
                        <Pressable
                            className={`${selectedType === "expense" ? "bg-red-500 transactions_toggle_active" : "transactions_toggle_inactive"}`}
                            onPress={() => {
                                setSelectedType("expense")
                                setValue("type", "expense")
                            }}
                        >
                            <Text className="text-white font-semibold">Expense</Text>
                        </Pressable>
                        <Pressable
                            className={`${selectedType === "income" ? "bg-green-500 transactions_toggle_active" : "transactions_toggle_inactive"}`}
                            onPress={() => {
                                setSelectedType("income")
                                setValue("type", "income")
                            }}
                        >
                            <Text className="text-white font-semibold">Income</Text>
                        </Pressable>
                    </View>
                    {errors.type && (
                        <Text className="text-red-400 text-sm">{errors.type.message}</Text>
                    )}

                    {/* Amount */}
                    <View>
                        <Controller
                            control={control}
                            name="amount"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="transactions_input"
                                    placeholder="Amount"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="decimal-pad"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.amount && (
                            <Text className="text-red-400 text-sm mt-1">{errors.amount.message}</Text>
                        )}
                    </View>

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
                                            className="transactions_select flex-row items-center justify-between"
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

                    {/* Payment method */}
                    <View>
                        <Text className="text-white/70 text-sm mb-2">Payment Method</Text>
                        <Controller
                            control={control}
                            name="payment_way"
                            render={({ field: { onChange, value } }) => (
                                <View className="gap-y-3">
                                    {paymentMethods.map((method) => {
                                        const isSelected = value === method
                                        const colors: Record<string, string> = {
                                            cash: "bg-budget-300/20 border-budget-500",
                                            card: "bg-primary-500/20 border-primary-500",
                                            "bank account": "bg-savings-500/20 border-savings-500",
                                        }
                                        const dotColors: Record<string, string> = {
                                            cash: "bg-budget-500",
                                            card: "bg-primary-500",
                                            "bank account": "bg-savings-500",
                                        }
                                        return (
                                            <Pressable
                                                key={method}
                                                className={`flex-row items-center gap-x-3 px-4 py-4 rounded-xl border ${isSelected ? `${colors[method]} border-2` : "border-slate-300/30 bg-primary-500/10"}`}
                                                onPress={() => onChange(method)}
                                            >
                                                <View className={`size-5 rounded-full items-center justify-center ${isSelected ? dotColors[method] : "border-2 border-slate-400"}`}>
                                                    {isSelected && <View className="size-2 rounded-full bg-white" />}
                                                </View>
                                                <Text className={`capitalize text-base font-medium ${isSelected ? "text-white" : "text-white/60"}`}>
                                                    {method}
                                                </Text>
                                            </Pressable>
                                        )
                                    })}
                                </View>
                            )}
                        />
                        {errors.payment_way && (
                            <Text className="text-red-400 text-sm mt-1">{errors.payment_way.message}</Text>
                        )}
                    </View>

                    {/* Submit */}
                    <Pressable
                        className="bg-[#3b82f6] py-4 rounded-xl items-center mt-2"
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        <Text className="text-white font-bold text-lg">
                            {isSubmitting ? "Adding..." : "Add Transaction"}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
            <Snackbar
                className='mb-20'
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    )
}
