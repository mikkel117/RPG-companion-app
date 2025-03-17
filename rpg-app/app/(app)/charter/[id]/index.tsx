import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

import CharterStat from "~/components/CharterStat";
import ShowRollModal from "~/components/models/ShowRollModal";
import UpdateHealthModal from "~/components/models/UpdateHealthModal";
import UpdateLevelModal from "~/components/models/UpdateLevelModal";

import { getCharacterById, updateStats } from '~/functions/api/apiCharacter';
import { makeARoll } from '~/functions/roll';

import Button from "~/components/Button";

import { characterWithRelationsType, CharacterClassEnum, CharacterRaceEnum } from '~/types';

type rollType = {
    total: number;
    modifier: number;
    rolls: number[];
}

export default function page() {
    const { id } = useLocalSearchParams();
    const [charter, setCharter] = useState<characterWithRelationsType>();
    const [intelligenceStat, setIntelligenceStat] = useState<number>(0);
    const [strengthStat, setStrengthStat] = useState<number>(0);
    const [dexterityStat, setDexterityStat] = useState<number>(0);
    const [charismaStat, setCharismaStat] = useState<number>(0);
    const [wisdomStat, setWisdomStat] = useState<number>(0);
    const [health, setHealth] = useState<number>(0);
    const [level, setLevel] = useState<number>(0);
    const [diceroll, setDiceRoll] = useState<rollType>({ total: 0, modifier: 0, rolls: [] });
    const [showHealthModal, setShowHealthModal] = useState<boolean>(false);
    const [showLevelModal, setShowLevelModal] = useState<boolean>(false);

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
            setHealth(response.data.health);
            setLevel(response.data.level);
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
    }

    const saveStats = () => {
        updateStats(intelligenceStat, strengthStat, dexterityStat, charismaStat, wisdomStat, charter?.characterId ?? 0);
    }

    return (
        <>
            <Stack.Screen options={{ title: 'charter' }} />
            <View className="flex-1 bg-background">
                <Text className="text-5xl text-text text-center m-4">{charter?.name}</Text>
                <View className="p-4 bg-secondary rounded-lg shadow-lg">
                    <Pressable onPress={() => setShowLevelModal(true)}>
                        <Text className="text-text">
                            Level: {level}
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => setShowHealthModal(true)}>
                        <Text className="text-text">
                            Liv: {health}
                        </Text>
                    </Pressable>
                    <Text className="text-text">
                        Rase: {CharacterClassEnum[charter?.characterRace ?? 0]}
                    </Text>
                    <Text className="text-text">
                        Klasse: {CharacterRaceEnum[charter?.characterClass ?? 0]}
                    </Text>
                </View>

                <View className="p-4 flex justify-center items-end">
                    <Button title="Gem" onPress={saveStats} />
                </View>

                <View className="flex flex-row flex-wrap justify-between p-4 gap-1">
                    <CharterStat stat="intelligence" value={intelligenceStat} width="w-[48%]" setStat={setIntelligenceStat} roll={roll} />

                    <CharterStat stat="strength" value={strengthStat} width="w-[48%]" setStat={setStrengthStat} roll={roll} />

                    <CharterStat stat="dexterity" value={dexterityStat} width="w-[48%]" setStat={setDexterityStat} roll={roll} />

                    <CharterStat stat="charisma" value={charismaStat} width="w-[48%]" setStat={setCharismaStat} roll={roll} />

                    <CharterStat stat="wisdom" value={wisdomStat} width="w-full" setStat={setWisdomStat} roll={roll} />
                </View>
            </View >
            <ShowRollModal roll={diceroll} />
            <UpdateHealthModal visible={showHealthModal} onClose={() => setShowHealthModal(false)} health={health} setHealth={setHealth} />
            <UpdateLevelModal visible={showLevelModal} onClose={() => setShowLevelModal(false)} level={level} setLevel={setLevel} />
        </>
    );
}
