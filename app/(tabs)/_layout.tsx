import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
export default function TabsLayout() {
    return (
        <NativeTabs backgroundColor={"#162544"} tintColor="#ff8c42"
        minimizeBehavior="onScrollDown"
        labelVisibilityMode="labeled"
                >
            <NativeTabs.Trigger name="index" options={{ title: "Home" }}>
                <Label>Home</Label>
                <Icon
                    sf={{ default: "house", selected: "house.fill" }}
                    androidSrc={<VectorIcon family={MaterialCommunityIcons} name="home" />}
                />

            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="add-transaction"
                options={{ title: "Transaction", }}
            >
                <Icon
                    sf={{
                        default: "creditcard.and.123",
                        selected: "creditcard.and.123",
                    }}
                    androidSrc={
                        <VectorIcon
                            family={MaterialCommunityIcons}
                            name="credit-card-plus-outline"
                        />
                    }
                />
                <Label>Transaction</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="budget" options={{ title: "Budget" }}>
                <Icon
                    sf={{ default: "chart.pie", selected: "chart.pie.fill" }}
                    androidSrc={<VectorIcon family={MaterialCommunityIcons} name="chart-pie" />}
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