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
            <View className="flex-1">

                <View className="flex-row items-center justify-between p-4 bg-primary">
                    <Link href={`/`} className="mb-2">
                        <Text className="text-2xl font-semibold mb-2 text-text">gå hjem</Text>
                    </Link>
                </View>
                <Stack screenOptions={{ headerShown: false }}>
                    <Slot />
                </Stack>
                <View className="flex-row items-center justify-center p-4 bg-primary">
                    <Link href={`/charter/${id}/quests`} className="mb-2">
                        <Text className={`text-2xl font-semibold mb-2 ${isActive(`charter/${id}/quests`) ? "text-red-500" : "text-button"}`}>quests</Text>
                    </Link>
                </View>
            </View >
        </>
    )
}