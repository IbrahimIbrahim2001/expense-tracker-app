import { deleteAccount } from '@/api/delete-account'
import { useAuthStore } from '@/store/auth-store'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'

export default function DeleteAccountButton() {
    const { logout } = useAuthStore()
    const [visible, setVisible] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleConfirm = async () => {
        setIsDeleting(true)
        const res = await deleteAccount()
        setIsDeleting(false)

        if (res.success) {
            logout()
            router.replace('/(auth)')
        } else {
            setVisible(false)
        }
    }

    return (
        <>
            <Pressable
                className="border border-red-500/50 py-4 rounded-xl items-center flex-row justify-center"
                onPress={() => setVisible(true)}
                disabled={isDeleting}
            >
                {isDeleting ? (
                    <ActivityIndicator color="#f87171" />
                ) : (
                    <Text className="text-red-400 font-semibold text-lg">Delete Account</Text>
                )}
            </Pressable>

            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <Dialog.Icon icon="alert" />
                    <Dialog.Title style={{ textAlign: 'center' }}>Delete Account</Dialog.Title>
                    <Dialog.Content>
                        <Text style={{ textAlign: 'center', color: '#64748b' }}>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                        <Button textColor="#ef4444" onPress={handleConfirm}>Delete</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}
