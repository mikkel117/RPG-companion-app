import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { getCharacterById } from '~/apiCalls/apiCharacter';

import { characterWithRelationsType, CharacterClassEnum, CharacterRaceEnum } from '~/types';

export default function page() {
    const { id } = useLocalSearchParams();
    const [charter, setCharter] = useState<characterWithRelationsType>();
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
            <View className="flex-1 bg-gray-100">
                <Text className="text-5xl text-rose-800 text-center m-4">{charter?.name}</Text>
                <View className="p-4 bg-white rounded-lg shadow-lg">
                    <Text>
                        level: {charter?.level}
                    </Text>
                    <Text>
                        health: {charter?.health}
                    </Text>
                    <Text>
                        race: {CharacterClassEnum[charter?.characterRace ?? 0]}
                    </Text>
                    <Text>
                        class: {CharacterRaceEnum[charter?.characterClass ?? 0]}
                    </Text>
                </View>

                <View className="flex flex-row flex-wrap justify-between p-4 gap-1">
                    <View className={`${statsWrapperStyle} w-[48%]`}>
                        <Text className={statsTextStyle}>Intelligence: {charter?.intelligence}</Text>
                    </View>
                    <View className={`${statsWrapperStyle} w-[48%]`}>
                        <Text className={statsTextStyle}>Strength: {charter?.strength}</Text>
                    </View>
                    <View className={`${statsWrapperStyle} w-[48%]`}>
                        <Text className={statsTextStyle}>Dexterity: {charter?.dexterity}</Text>
                    </View>
                    <View className={`${statsWrapperStyle} w-[48%]`}>
                        <Text className={statsTextStyle}>Charisma: {charter?.charisma}</Text>
                    </View>
                    <View className={`${statsWrapperStyle} w-full`}>
                        <Text className={statsTextStyle}>Wisdom: {charter?.wisdom}</Text>
                    </View>
                </View>
            </View>
        </>
    );
}


const statsTextStyle = "text-2xl font-semibold text-center";
const statsWrapperStyle = "border-2 border-black p-2 rounded-md";
