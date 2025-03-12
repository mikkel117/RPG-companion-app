import { Text, View, Modal, TextInput, Pressable } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { updateLevel } from '~/functions/api/apiCharacter';

interface UpdateLevelModelProps {
    visible: boolean;
    onClose: () => void;
    level: number;
    setLevel: (level: number) => void;
}

const UpdateLevelModal: React.FC<UpdateLevelModelProps> = ({ visible, onClose, level, setLevel }) => {
    const [levelValue, setLevelValue] = useState<number>(0);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        setLevelValue(level);
    }, [level])


    const handleUpdate = () => {
        updateLevel(levelValue, id as string).then((response) => {
            if (response.success) {
                setLevel(levelValue);
                onClose();
            }
            else {
                console.log("Error updating health");

            }
        })
        setLevel(levelValue);
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
                <View className="bg-primary w-80 h-80 rounded-lg p-4">
                    <View className="flex-row items-center justify-between w-full px-4">
                        <Text className="text-3xl text-text">Opdater level</Text>
                        <Pressable onPress={onClose} className="-mr-2">
                            <Text className="text-2xl text-text">X</Text>
                        </Pressable>
                    </View>
                    <View className="flex-1 flex-row justify-around items-center">
                        <Pressable onPress={() => setLevelValue(levelValue - 1)}>
                            <Text className='text-3xl text-text'>-</Text>
                        </Pressable>
                        <Text className='text-3xl text-text'>{levelValue}</Text>
                        <Pressable onPress={() => setLevelValue(levelValue + 1)}>
                            <Text className='text-3xl text-text'>+</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={handleUpdate} className="m-2 bg-button rounded-[28px] shadow-md p-4">
                        <Text className="text-2xl font-semibold text-center text-text">Opdater</Text>
                    </Pressable>
                </View>
            </View >
        </Modal >
    )
}

export default UpdateLevelModal