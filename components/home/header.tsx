import { useAuthStore } from '@/store/auth-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

export default function Header() {
    const user = useAuthStore(s => s.user);
    return (
        <View className='w-full flex flex-row justify-between items-center'>
            {/* Hello user section */}
            <View className="flex flex-col">
                <Text className="text-3xl text-white/90" >
                    Hello,
                </Text>
                <Text className="text-4xl font-bold text-white">
                    {user?.username ?? "User"}
                </Text>
            </View>
            {/* Icon section */}
            <View className="p-3 rounded-full border border-primary-500/40" >
                <Ionicons name="notifications" size={20} color={"white"} className='border-white' />
            </View>
        </View>
    )
}