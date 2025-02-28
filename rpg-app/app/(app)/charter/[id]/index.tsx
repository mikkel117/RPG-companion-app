import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { getCharacterById } from '~/apiCalls/apiCharacter';

export default function page() {
    const { id } = useLocalSearchParams();
    const [charter, setCharter] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharter = async () => {
            const charterId = id as string;
            const response = await getCharacterById(charterId);
            if (!response.success) {
                console.error('Error:', response.error);
                return;
            }
            setCharter(response.data);
            console.log('data:', response.data);
        }
        if (id) {
            fetchCharter();
        } else {
            console.error('No id found in params');
        };

        fetchCharter();
    }, []);
    return (
        <>
            <Stack.Screen options={{ title: 'charter' }} />
            <View>
                <Text>Charter {id}</Text>
            </View>
        </>
    );
}
