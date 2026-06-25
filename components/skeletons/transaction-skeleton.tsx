import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

export function SkeletonBlock({ className }: { className: string }) {
    const opacity = useRef(new Animated.Value(0.3))

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        )
        animation.start()
        return () => animation.stop()
    }, [])

    return (
        <Animated.View
            className={`rounded-lg bg-white/20 ${className}`}
            style={{ opacity: opacity.current }}
        />
    )
}

export function TransactionRowSkeleton() {
    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row gap-x-3 items-center">
                <SkeletonBlock className="size-16 rounded-xl" />
                <View className="gap-y-2">
                    <SkeletonBlock className="h-4 w-24" />
                    <SkeletonBlock className="h-3 w-16" />
                </View>
            </View>
            <View className="items-end gap-y-2">
                <SkeletonBlock className="h-4 w-16" />
                <SkeletonBlock className="h-3 w-20" />
            </View>
        </View>
    )
}

export function TransactionListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <View className="gap-y-2">
            {Array.from({ length: count }).map((_, i) => (
                <TransactionRowSkeleton key={i} />
            ))}
        </View>
    )
}
