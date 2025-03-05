import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

import { getCharacterById } from '~/functions/api/apiCharacter';
import { makeARoll } from '~/functions/roll';

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

    const roll = (modifier: number) => {
        const { total, rolls } = makeARoll(modifier);
        console.log('total:', total, 'rolls:', rolls);
    }
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

                <View className="p-4 flex justify-center items-end">
                    <Pressable className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4">
                        <Text className="text-2xl font-semibold text-white">Gem</Text>
                    </Pressable>
                </View>

                <View className="flex flex-row flex-wrap justify-between p-4 gap-1">
                    <View className={`${statsWrapperStyle} w-[48%]`}>
                        <Pressable>
                            <Text className={statsTextStyle}>-</Text>
                        </Pressable>
                        <Pressable onPress={() => roll(charter?.intelligence ?? 0)}>
                            <Text className={statsTextStyle}>Intelligence: {charter?.intelligence}</Text>
                        </Pressable>
                        <Pressable>
                            <Text className={statsTextStyle}>+</Text>
                        </Pressable>
                    </View>

                    <View className={`${statsWrapperStyle} w-[48%]`}>
                        <Pressable>
                            <Text className={statsTextStyle}>-</Text>
                        </Pressable>

                        <Pressable onPress={() => roll(charter?.strength ?? 0)}>
                            <Text className={statsTextStyle}>Strength: {charter?.strength}</Text>
                        </Pressable>

                        <Pressable>
                            <Text className={statsTextStyle}>+</Text>
                        </Pressable>
                    </View>

                    <View className={`${statsWrapperStyle} w-[48%]`}>
                        <Pressable>
                            <Text className={statsTextStyle}>-</Text>
                        </Pressable>
                        <Pressable onPress={() => roll(charter?.dexterity ?? 0)}>
                            <Text className={statsTextStyle}>Dexterity: {charter?.dexterity}</Text>
                        </Pressable>
                        <Pressable>
                            <Text className={statsTextStyle}>+</Text>
                        </Pressable>
                    </View>

                    <View className={`${statsWrapperStyle} w-[48%]`}>

                        <Pressable>
                            <Text className={statsTextStyle}>-</Text>
                        </Pressable>

                        <Pressable onPress={() => roll(charter?.charisma ?? 0)}>
                            <Text className={statsTextStyle}>Charisma: {charter?.charisma}</Text>
                        </Pressable>

                        <Pressable>
                            <Text className={statsTextStyle}>+</Text>
                        </Pressable>
                    </View>

                    <View className={`${statsWrapperStyle} w-full`}>
                        <Pressable>
                            <Text className={statsTextStyle}>-</Text>
                        </Pressable>
                        <Pressable onPress={() => roll(charter?.wisdom ?? 0)}>
                            <Text className={statsTextStyle}>Wisdom: {charter?.wisdom}</Text>
                        </Pressable>

                        <Pressable>
                            <Text className={statsTextStyle}>+</Text>
                        </Pressable>
                    </View>
                </View>
            </View >
        </>
    );
}


const statsTextStyle = "text-2xl font-semibold";
const statsWrapperStyle = "border-2 border-black p-2 rounded-md flex-row justify-between items-center flex-wrap";
