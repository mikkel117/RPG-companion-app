import { View, Text, Pressable } from "react-native";
import { Stack, Slot, Link, useLocalSearchParams, useSegments } from "expo-router";

export default function Layout() {
    const { id } = useLocalSearchParams();
    const segments = useSegments();


    const isActive = (href: string) => {
        let cleanSegments = segments.filter(seg => seg !== "(app)").join("/");
        const clearHref = href.replace(/^\/|\/$/g, "");

        if (id) {
            cleanSegments = cleanSegments.replace("[id]", id.toString());
        }

        return cleanSegments === clearHref;
    }


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
                    <Link href={`/charter/${id}/quests`} className="mb-2">
                        <Text className={`text-2xl font-semibold mb-2 ${isActive(`charter/${id}/quests`) ? "text-blue-500" : "text-black"}`}>quests</Text>
                    </Link>
                </View>
            </View >
        </>
    )
}