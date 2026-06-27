import { deleteBudget } from '@/api/delete-budget'
import { budget } from '@/types/budget'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Text } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'

interface DeleteBudgetDialogProps {
    budget: budget
    visible: boolean
    onDismiss: () => void
}

export default function DeleteBudgetDialog({ budget, visible, onDismiss }: DeleteBudgetDialogProps) {
    const { id: budgetId, category } = budget
    const queryClient = useQueryClient()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        const res = await deleteBudget(budgetId)
        setIsDeleting(false)
        onDismiss()
        if (res.success) {
            queryClient.invalidateQueries({ queryKey: ['budgets'] })
        }
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                    Delete {category}?
                </Dialog.Title>
                <Dialog.Content>
                    <Text style={{ textAlign: 'center', color: '#64748b' }}>
                        Are you sure you want to delete this budget? This cannot be undone.
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button textColor="#ef4444" onPress={handleDelete} loading={isDeleting} disabled={isDeleting}>
                        Delete
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
