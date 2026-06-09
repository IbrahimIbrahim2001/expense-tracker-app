import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
export default function TabsLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index" options={{ title: "Home" }}>
                <Label>Home</Label>
                <Icon
                    sf={{ default: "house", selected: "house.fill" }}
                    androidSrc={<VectorIcon family={MaterialCommunityIcons} name="home" />}
                />

            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings" options={{ title: "Settings" }}>
                <Icon
                    sf={{ default: "gearshape", selected: "gearshape.fill" }}
                    androidSrc={<VectorIcon family={MaterialCommunityIcons} name="cog" />}
                />
                <Label>Settings</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}