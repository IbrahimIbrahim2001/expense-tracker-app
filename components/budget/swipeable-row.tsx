import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ReactNode, useRef } from 'react'
import { Pressable, Text } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

interface SwipeableRowProps {
    children: ReactNode
    onDelete: () => void
}

export default function SwipeableRow({ children, onDelete }: SwipeableRowProps) {
    const swipeableRef = useRef<Swipeable>(null)

    const renderRightActions = () => (
        <Pressable
            className="bg-red-500 rounded-2xl justify-center items-center w-20 mb-4 ml-3"
            onPress={() => {
                swipeableRef.current?.close()
                onDelete()
            }}
        >
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />
            <Text className="text-white text-xs font-semibold mt-1">Delete</Text>
        </Pressable>
    )

    return (
        <Swipeable ref={swipeableRef} renderRightActions={renderRightActions} overshootRight={false}>
            {children}
        </Swipeable>
    )
}
