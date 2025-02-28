import { View, Text, Pressable } from "react-native";
import { Stack, Slot, Link } from "expo-router";

export default function Layout() {
    return (
        <>
            <View style={{ flex: 1 }}>

                <View style={{ padding: 20, backgroundColor: "lightgray", alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Link href={`/`} className="mb-2">
                        <Text className="text-2xl font-semibold mb-2">go home</Text>
                    </Link>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Header</Text>
                </View>
                <Stack screenOptions={{ headerShown: false }}>
                    <Slot />
                </Stack>
                <View style={{ padding: 20, backgroundColor: "lightgray", alignItems: "center" }}>
                    <Text style={{ fontSize: 16 }}>Footer</Text>
                </View>
            </View >
        </>
    )
}