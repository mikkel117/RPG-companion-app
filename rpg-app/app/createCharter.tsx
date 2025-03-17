import { Text, View, TextInput, ScrollView, Switch, Pressable, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import React, { useState, useRef } from 'react'

import { Picker } from '@react-native-picker/picker';


import { createCharterApi } from '~/functions/api/apiCharacter';
import { characterType, createCharterType } from '~/types';
import { getUserIdUsingCookie, getUserIdUsingStorage } from '~/functions/api/tokenHandling';

import { Container } from '~/components/Container';
import { ClassArray, RaceArray, CharacterClassEnum, CharacterRaceEnum } from '~/types';
import { rollStat } from '~/functions/roll';
import Button from '~/components/Button';

export default function createCharter() {
    const [selectedRace, setSelectedRace] = useState<keyof typeof CharacterRaceEnum | undefined>();
    const [selectedClass, setSelectedClass] = useState<keyof typeof CharacterClassEnum | undefined>();
    const [name, setName] = useState<string>('');
    const [intelligence, setIntelligence] = useState<number>(0);
    const [strength, setStrength] = useState<number>(0);
    const [dexterity, setDexterity] = useState<number>(0);
    const [charisma, setCharisma] = useState<number>(0);
    const [wisdom, setWisdom] = useState<number>(0);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const router = useRouter();

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const pickerRef = useRef<any>(null);

    const createCharterFun = async () => {
        if (!selectedRace || !selectedClass || selectedRace === undefined || selectedClass === undefined) {
            return;
        }
        const classValue = CharacterClassEnum[selectedClass as keyof typeof CharacterClassEnum];
        const raceValue = CharacterRaceEnum[selectedRace as keyof typeof CharacterRaceEnum];

        const userId = Platform.OS === 'android' ? await getUserIdUsingStorage() : getUserIdUsingCookie();


        const character: createCharterType = {
            name: name,
            characterClass: classValue,
            characterRace: raceValue,
            intelligence: intelligence,
            strength: strength,
            dexterity: dexterity,
            charisma: charisma,
            wisdom: wisdom,
            userId: parseInt(userId),
            level: 1,
            health: 15
        }


        createCharterApi(character);
        router.replace('/');
    }

    return (
        <Container>
            <Link href="/">
                <Text className='text-2xl text-text'>Tilbage</Text>
            </Link>
            <Text className='text-center text-3xl text-text'>Lav karkter</Text>
            <ScrollView>
                <View>
                    <Text className='text-xl text-text'>Navn</Text>
                    <TextInput
                        className="m-2 text-xl rounded border p-4 text-black border-black bg-white"
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <Text className='text-xl text-text'>Race</Text>

                <View className='m-2 border'>
                    <Picker
                        ref={pickerRef}
                        selectedValue={selectedRace}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedRace(itemValue)
                        }
                    >
                        <Picker.Item label='Vælg en rase' value={undefined} />
                        {RaceArray.map((value, index) => (
                            <Picker.Item key={index} label={value} value={value} />
                        ))}
                    </Picker>
                </View>


                <Text className='text-xl text-text'>Klasse</Text>
                <View className='m-2 border'>
                    <Picker
                        ref={pickerRef}
                        selectedValue={selectedClass}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedClass(itemValue)
                        }
                    >
                        <Picker.Item label='Vælg en klass' value={undefined} />
                        {ClassArray.map((value, index) => (
                            <Picker.Item key={index} label={value} value={value} />
                        ))}
                    </Picker>
                </View>

                <View className='bg-gray-300 m-2 p-2'>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                {!isEnabled ? (
                    <View className='flex flex-wrap m-2'>
                        <View className=' w-full'>
                            <Text className='text-xl text-text'>Intelligence</Text>
                            <TextInput
                                className=" text-xl rounded border p-4 border-black bg-white w-full"
                                keyboardType='numeric'
                                onChangeText={(text) => setIntelligence(parseInt(text.replace(/[^0-9]/g, '')))}
                                value={intelligence.toString()}
                            />
                        </View>

                        <View>
                            <Text className='text-xl text-text'>Strength</Text>
                            <TextInput
                                className=" text-xl rounded border p-4 border-black bg-white w-full"
                                keyboardType='numeric'
                                onChangeText={(text) => setStrength(parseInt(text.replace(/[^0-9]/g, '')))}
                                value={strength.toString()}
                            />
                        </View>


                        <View >
                            <Text className='text-xl text-text'>Dexterity</Text>
                            <TextInput
                                className=" text-xl rounded border p- border-black bg-white w-full"
                                keyboardType='numeric'
                                onChangeText={(text) => setDexterity(parseInt(text.replace(/[^0-9]/g, '')))}
                                value={dexterity.toString()}
                            />
                        </View>

                        <View>
                            <Text className='text-xl text-text'>Charisma</Text>
                            <TextInput
                                className=" text-xl rounded border p-4 border-black bg-white w-full"
                                keyboardType='numeric'
                                onChangeText={(text) => setCharisma(parseInt(text.replace(/[^0-9]/g, '')))}
                                value={charisma.toString()}
                            />
                        </View>

                        <View>
                            <Text className='text-xl text-text'>Wisdom</Text>
                            <TextInput
                                className=" text-xl rounded border p-4 border-black bg-white w-full"
                                keyboardType='numeric'
                                onChangeText={(text) => setWisdom(parseInt(text.replace(/[^0-9]/g, '')))}
                                value={wisdom.toString()}
                            />
                        </View>

                    </View>
                ) : (
                    <View className='flex flex-wrap m-2 gap-5'>
                        <View className='w-full'>
                            <Text className='text-xl text-text'>Intelligence {intelligence}</Text>
                            <Button title='rull' onPress={() => setIntelligence(rollStat("drop-lowest"))} />
                        </View>

                        <View className='border border-secondary'></View>

                        <View>
                            <Text className='text-xl text-text'>Strength {strength}</Text>
                            <Button title='rull' onPress={() => setStrength(rollStat("drop-lowest"))} />
                        </View>

                        <View className='border border-secondary'></View>

                        <View>
                            <Text className='text-xl text-text'>Dexterity {dexterity}</Text>
                            <Button title='rull'
                                onPress={() => setDexterity(rollStat("drop-lowest"))} />
                        </View>

                        <View className='border border-secondary'></View>

                        <View>
                            <Text className='text-xl text-text'>Charisma {charisma}</Text>
                            <Button title='rull' onPress={() => setCharisma(rollStat("drop-lowest"))} />
                        </View>

                        <View className='border border-secondary'></View>

                        <View>
                            <Text className='text-xl text-text'>Wisdom {wisdom}</Text>
                            <Button title='rull' onPress={() => setWisdom(rollStat("drop-lowest"))} />
                        </View>

                        <View className='border border-secondary mb-5'></View>
                    </View>

                )}

                <Button title='Lav karkter' onPress={createCharterFun} />
            </ScrollView>

        </Container >
    )
}