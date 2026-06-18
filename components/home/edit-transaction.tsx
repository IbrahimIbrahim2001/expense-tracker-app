import { categoryColors, categoryIcons } from '@/lib/constants';
import { categories, paymentMethods } from '@/schemas/transaction-schema';
import { transactionItem } from '@/types/transactions-item';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Menu, Snackbar } from 'react-native-paper';
import { z } from "zod";

const updateTransactionSchema = z.object({
    category: z.enum(categories).optional(),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount").optional(),
    type: z.enum(["expense", "income"]).optional(),
    payment_way: z.enum(paymentMethods).optional(),
})

type UpdateTransactionSchemaType = z.infer<typeof updateTransactionSchema>

interface EditTransactionProps {
    item: transactionItem
    bottomSheetModalRef: React.RefObject<BottomSheetModal | null>
    onChange?: (index: number) => void
}

export default function EditTransaction({ item, bottomSheetModalRef, onChange }: EditTransactionProps) {
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const snapPoints = useMemo(() => ['75%', '90%'], []);

    const handleSheetChanges = useCallback(
        (index: number) => {
            if (index === -1) bottomSheetModalRef?.current?.dismiss();
        },
        [bottomSheetModalRef],
    );

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<UpdateTransactionSchemaType>({
        defaultValues: {
            category: item.category,
            amount: item.amount,
            type: item.type,
            payment_way: item.payment_way,
        } as any,
        resolver: zodResolver(updateTransactionSchema),
    })

    const currentType = watch("type")

    const onSubmit = (data: UpdateTransactionSchemaType) => {
        console.log("Edit transaction data:", data)
        setSnackbarMessage("Changes saved (console)")
        setSnackbarVisible(true)
    }

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onChange={onChange ?? handleSheetChanges}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: '#162544' }}
            handleIndicatorStyle={{ backgroundColor: '#ffffff40' }}
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
            )}
        >
            <BottomSheetScrollView className="flex-1 px-5 pt-4 pb-6 bg-[#162544]">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="gap-y-5">
                        {/* Type toggle */}
                        <View className="flex-row gap-x-4">
                            <Pressable
                                className={`py-3 px-6 rounded-xl ${currentType === "expense" ? "bg-red-500" : "bg-white/10"}`}
                                onPress={() => setValue("type", "expense")}
                            >
                                <Text className="text-white font-semibold">Expense</Text>
                            </Pressable>
                            <Pressable
                                className={`py-3 px-6 rounded-xl ${currentType === "income" ? "bg-green-500" : "bg-white/10"}`}
                                onPress={() => setValue("type", "income")}
                            >
                                <Text className="text-white font-semibold">Income</Text>
                            </Pressable>
                        </View>

                        {/* Amount */}
                        <View>
                            <Controller
                                control={control}
                                name="amount"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-white/10 text-white px-4 py-3 rounded-xl"
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
                                                className="bg-white/10 flex-row items-center justify-between px-4 py-3 rounded-xl"
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
                        >
                            <Text className="text-white font-bold text-lg">Save Changes</Text>
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
            </BottomSheetScrollView>
        </BottomSheetModal>
    )
}
