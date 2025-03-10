import { Text, View, TextInput, Platform } from 'react-native';
import { Link } from 'expo-router';
import React, { useState, useRef } from 'react'

import { Picker } from '@react-native-picker/picker';

import { Container } from '~/components/Container';
import { ClassArray, RaceArray } from '~/types';

export default function createCharter() {
    const [selectedRace, setSelectedRace] = useState();
    const [selectedClass, setSelectedClass] = useState();

    const pickerRef = useRef<any>(null);

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    return (
        <Container>
            <Link href="/">
                <Text className='text-2xl'>Back</Text>
            </Link>
            <Text className='text-center text-3xl'>Create charter</Text>

            <View>
                <Text className='text-xl'>Navn</Text>
                <TextInput
                    className="m-2 text-xl rounded border p-4 text-black border-black bg-white"
                />
            </View>

            <Text className='text-xl'>Race</Text>

            <View className='m-2 border '>
                <Picker
                    ref={pickerRef}
                    selectedValue={selectedRace}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedRace(itemValue)
                    }
                >

                    {RaceArray.map((value, index) => (
                        <Picker.Item key={index} label={value} value={value} />
                    ))}
                </Picker>
            </View>


            <Text className='text-xl'>Klass</Text>
            <View className='m-2 border'>
                <Picker
                    ref={pickerRef}
                    selectedValue={selectedClass}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedClass(itemValue)
                    }
                >
                    {ClassArray.map((value, index) => (
                        <Picker.Item key={index} label={value} value={value} />
                    ))}
                </Picker>
            </View>

            <View className='flex flex-row justify-between'>

                <View>
                    <Text className='text-xl'>Intelligence</Text>
                    <TextInput
                        className=" text-xl rounded border p-4 text-black border-black bg-white"
                    />
                </View>

                <View>
                    <Text className='text-xl'>Strength</Text>
                    <TextInput
                        className=" text-xl rounded border p-4 text-black border-black bg-white"
                    />
                </View>


                <View>
                    <Text className='text-xl'>Dexterity</Text>
                    <TextInput
                        className=" text-xl rounded border p-4 text-black border-black bg-white"
                    />
                </View>

                <View>
                    <Text className='text-xl'>Charisma</Text>
                    <TextInput
                        className=" text-xl rounded border p-4 text-black border-black bg-white"
                    />
                </View>

                <View>
                    <Text className='text-xl'>Wisdom</Text>
                    <TextInput
                        className=" text-xl rounded border p-4 text-black border-black bg-white"
                    />
                </View>

            </View>

        </Container>
    )
}