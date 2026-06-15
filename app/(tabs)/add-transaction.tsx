import AddTransactionForm from "@/components/add-transaction-form";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTransactionScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c] p-4">
            <View className="flex-row items-center justify-between mb-6">
                <Text className="text-2xl font-bold">
                    Add Transaction
                </Text>
            </View>

            <AddTransactionForm />
        </SafeAreaView>
    );
}