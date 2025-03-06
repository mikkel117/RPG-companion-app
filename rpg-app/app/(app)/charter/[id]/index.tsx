import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

import CharterStat from "~/components/CharterStat";
import ShowRollModal from "~/components/models/ShowRollModal";

import { getCharacterById, updateStats } from '~/functions/api/apiCharacter';
import { makeARoll } from '~/functions/roll';

import { characterWithRelationsType, CharacterClassEnum, CharacterRaceEnum } from '~/types';

type rollType = {
    total: number;
    modifier: number;
    rolls: number[];
}

export default function page() {
    const { id } = useLocalSearchParams();
    const [charter, setCharter] = useState<characterWithRelationsType>();
    const [error, setError] = useState<string | null>(null);
    const [intelligenceStat, setIntelligenceStat] = useState<number>(0);
    const [strengthStat, setStrengthStat] = useState<number>(0);
    const [dexterityStat, setDexterityStat] = useState<number>(0);
    const [charismaStat, setCharismaStat] = useState<number>(0);
    const [wisdomStat, setWisdomStat] = useState<number>(0);
    const [showRollModal, setShowRollModal] = useState<boolean>(true);
    const [diceroll, setDiceRoll] = useState<rollType>({ total: 0, modifier: 0, rolls: [] });

    useEffect(() => {
        const fetchCharter = async () => {
            const charterId = id as string;
            const response = await getCharacterById(charterId);
            if (!response.success) {
                console.error('Error:', response.error);
                return;
            }
            setCharter(response.data);
            setIntelligenceStat(response.data.intelligence);
            setStrengthStat(response.data.strength);
            setDexterityStat(response.data.dexterity);
            setCharismaStat(response.data.charisma);
            setWisdomStat(response.data.wisdom);
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
        setDiceRoll({ total, modifier, rolls });
        setShowRollModal(true);
        console.log('total:', total, 'rolls:', rolls);
    }

    const saveStats = () => {
        updateStats(intelligenceStat, strengthStat, dexterityStat, charismaStat, wisdomStat, charter?.characterId ?? 0);
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
                    <Pressable className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4" onPress={saveStats}>
                        <Text className="text-2xl font-semibold text-white">Gem</Text>
                    </Pressable>
                </View>

                <View className="flex flex-row flex-wrap justify-between p-4 gap-1">
                    <CharterStat stat="intelligence" value={intelligenceStat} width="w-[48%]" setStat={setIntelligenceStat} roll={roll} />

                    <CharterStat stat="strength" value={strengthStat} width="w-[48%]" setStat={setStrengthStat} roll={roll} />

                    <CharterStat stat="dexterity" value={dexterityStat} width="w-[48%]" setStat={setDexterityStat} roll={roll} />

                    <CharterStat stat="charisma" value={charismaStat} width="w-[48%]" setStat={setCharismaStat} roll={roll} />

                    <CharterStat stat="wisdom" value={wisdomStat} width="w-full" setStat={setWisdomStat} roll={roll} />
                </View>
            </View >
            <ShowRollModal visible={showRollModal} onClose={() => setShowRollModal(false)} roll={diceroll} />
        </>
    );
}
