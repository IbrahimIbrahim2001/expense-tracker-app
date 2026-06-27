import { updateBudget } from '@/api/update-budget'
import { updateBudgetSchema, type UpdateBudgetSchemaType } from '@/schemas/budget-schema'
import { budget } from '@/types/budget'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'

export default function EditBudgetDialog({ item, visible, onDismiss }: { item: budget; visible: boolean; onDismiss: () => void }) {
    const queryClient = useQueryClient()
    const [isSaving, setIsSaving] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm<UpdateBudgetSchemaType>({
        defaultValues: { limit: String(item.limit) },
        resolver: zodResolver(updateBudgetSchema),
    })

    const onSubmit = async (data: UpdateBudgetSchemaType) => {
        setIsSaving(true)
        const res = await updateBudget(item.id, { limit: Number(data.limit) })
        setIsSaving(false)

        if (res.success) {
            queryClient.invalidateQueries({ queryKey: ['budgets'] })
            onDismiss()
        }
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Icon icon="wallet" />
                <Dialog.Title style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                    {item.category}
                </Dialog.Title>
                <Dialog.Content>
                    <View className="gap-y-1">
                        <Text className="text-white/70 text-sm mb-1">Monthly Limit</Text>
                        <Controller
                            control={control}
                            name="limit"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    mode="outlined"
                                    placeholder="500"
                                    keyboardType="decimal-pad"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    outlineStyle={{ borderRadius: 12 }}
                                    contentStyle={{ fontSize: 16 }}
                                />
                            )}
                        />
                        {errors.limit && (
                            <Text className="text-red-400 text-sm mt-1">{errors.limit.message}</Text>
                        )}
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button
                        textColor="#3b82f6"
                        onPress={handleSubmit(onSubmit)}
                        loading={isSaving}
                        disabled={isSaving}
                    >
                        Save
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
