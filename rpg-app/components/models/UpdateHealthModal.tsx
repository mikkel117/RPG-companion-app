import { Text, View, Modal, TextInput, Pressable } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { updateHealth } from '~/functions/api/apiCharacter';

interface UpdateHealthModelProps {
    visible: boolean;
    onClose: () => void;
    health: number;
    setHealth: (health: number) => void;
}

const UpdateHealthModal: React.FC<UpdateHealthModelProps> = ({ visible, onClose, health, setHealth }) => {
    const [healthValue, setHealthValue] = useState<number>(0);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        setHealthValue(health);
    }, [health])


    const handleUpdate = () => {
        updateHealth(healthValue, id as string).then((response) => {
            if (response.success) {
                setHealth(healthValue);
                onClose();
            }
            else {
                console.log("Error updating health");

            }
        })
        setHealth(healthValue);
        onClose();
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View className="flex-1
            justify-center
            items-center
            bg-black/50">
                <View className="bg-white w-80 h-80 rounded-lg p-4">
                    <View className="flex-row items-center justify-between w-full px-4">
                        <Text className="text-3xl text-black">Opdater liv</Text>
                        <Pressable onPress={onClose} className="-mr-2">
                            <Text className="text-2xl text-gray-500">X</Text>
                        </Pressable>
                    </View>
                    <View className="flex-1 flex-row justify-around items-center">
                        <Pressable onPress={() => setHealthValue(healthValue - 1)}>
                            <Text className='text-3xl'>-</Text>
                        </Pressable>
                        <Text className='text-3xl'>{healthValue}</Text>
                        <Pressable onPress={() => setHealthValue(healthValue + 1)} >
                            <Text className='text-3xl'>+</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={handleUpdate} className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4">
                        <Text className="text-2xl font-semibold text-center text-white">Opdater</Text>
                    </Pressable>
                </View>
            </View >
        </Modal >
    )
}

export default UpdateHealthModal