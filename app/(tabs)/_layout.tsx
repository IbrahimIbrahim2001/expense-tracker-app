import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
export default function TabsLayout() {
    return (
        <NativeTabs backgroundColor={"#162544"} tintColor="#ff8c42"
        >
            <NativeTabs.Trigger name="index" options={{ title: "Home" }}>
                <Label>Home</Label>
                <Icon
                    sf={{ default: "house", selected: "house.fill" }}
                    androidSrc={<VectorIcon family={MaterialCommunityIcons} name="home" />}
                />

            </NativeTabs.Trigger>
            <NativeTabs.Trigger
                name="add-transaction"
                options={{ title: "Add", }}
            >
                <Icon
                    sf={{
                        default: "plus.circle",
                        selected: "plus.circle.fill",
                    }}
                    androidSrc={
                        <VectorIcon
                            family={MaterialCommunityIcons}
                            name="plus-circle"
                        />
                    }
                />
                <Label>Add</Label>
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