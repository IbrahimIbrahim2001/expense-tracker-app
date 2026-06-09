import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function WelcomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-primary-950">
            {/* Background blobs */}
            <View className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary-700 opacity-20" />
            <View className="absolute right-0 top-32 h-80 w-80 rounded-full bg-savings-500 opacity-10" />

            <View className="flex-1 px-8">
                {/* Hero */}
                <View className="flex-1 justify-center">
                    <View className="mb-6 h-16 w-16 items-center justify-center rounded-2xl bg-primary-500">
                        <Text className="text-3xl">💰</Text>
                    </View>

                    <Text className="text-5xl font-extrabold text-white">
                        Take Control
                    </Text>

                    <Text className="mt-2 text-5xl font-extrabold text-primary-300">
                        Of Your Money
                    </Text>

                    <Text className="mt-6 text-lg leading-7 text-slate-300">
                        Track expenses, manage budgets, and grow your savings with a
                        beautiful finance experience.
                    </Text>

                    {/* Feature Pills */}
                    <View className="mt-8 flex-row flex-wrap gap-3">
                        <View className="rounded-full bg-white/10 px-4 py-2">
                            <Text className="text-white">📊 Analytics</Text>
                        </View>

                        <View className="rounded-full bg-white/10 px-4 py-2">
                            <Text className="text-white">💸 Expenses</Text>
                        </View>

                        <View className="rounded-full bg-white/10 px-4 py-2">
                            <Text className="text-white">🎯 Budgets</Text>
                        </View>
                    </View>
                </View>

                {/* Bottom CTA */}
                <View className="pb-10">
                    <Link href="/signup" asChild>
                        <Pressable className="items-center rounded-2xl bg-primary-500 py-4 active:opacity-90">
                            <Text className="text-lg font-bold text-white">
                                Get Started
                            </Text>
                        </Pressable>
                    </Link>

                    <Text className="mt-4 text-center text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-primary-300">
                            Sign in
                        </Link>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}