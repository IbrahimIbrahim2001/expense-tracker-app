import { useNotifications } from '@/hooks/useNotifications';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
    const { notifications } = useNotifications();

    return (
        <SafeAreaView className="flex-1 bg-[#2a4b8c]">
            <View className="flex-1 px-3">
                {notifications.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-white/60 text-lg">No notifications yet</Text>
                    </View>
                ) : (
                    <FlashList
                        data={notifications}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className="bg-white/10 rounded-xl p-4 mb-3">
                                <Text className="text-white font-bold text-base">{item.title}</Text>
                                <Text className="text-white/70 text-sm mt-1">{item.body}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
