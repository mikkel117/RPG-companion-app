import { Text, Platform, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getTokenUsingStorage, getTokenUsingCookie } from "~/apiCalls/tokenHandling";

export default function test() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const getToken = async () => {
            const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
            if (token != "") {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setLoading(false);
            }
        }
        getToken();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <Text className="text-5xl text-rose-800 text-center">Loading...</Text>
            </View>
        )
    }

    if (isAuthenticated === false) {
        return <Redirect href="/" />
    }

    return (
        <Stack />
    )

}