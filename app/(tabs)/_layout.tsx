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
            <NativeTabs.Trigger name="add-transaction"
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
            <NativeTabs.Trigger name="budget" options={{ title: "Budget" }}>
                <Icon
                    sf={{ default: "wallet.pass", selected: "wallet.pass.fill" }}
                    androidSrc={<VectorIcon family={MaterialCommunityIcons} name="wallet" />}
                />
                <Label>Budget</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile" options={{ title: "Profile" }}>
                <Icon
                    sf={{ default: "person.circle", selected: "person.circle.fill" }}
                    androidSrc={<VectorIcon family={MaterialCommunityIcons} name="account-circle" />}
                />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}