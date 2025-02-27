import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";

export default function page() {
    const { id } = useLocalSearchParams();
    return (
        <>
            <Stack.Screen options={{ title: 'charter' }} />
            <View>
                <Text>Charter {id}</Text>
            </View>
        </>
    );
}
