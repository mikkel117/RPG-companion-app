import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLogin } from '~/contexts/LoginContext';
import { getUserById } from '~/apiCalls/apiUser';
import { userType, CharacterClassEnum, CharacterRaceEnum } from "~/types";

const UserHome = () => {
    const { setLoggedIn } = useLogin();
    const [user, setUser] = useState<userType | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById();
            if (!userData.success) {
                console.log('Error fetching user data:', userData.error);
            } else {
                console.log(userData.data);

                setUser(userData.data);
            }
        }
        fetchUser();
    }, [])

    const logout = () => {
        console.log(user);

        setLoggedIn(false);
        console.log('logged out');
    }

    return (
        <View>
            <Text>Welcome, {user?.username}</Text>
            <ScrollView>
                {user?.characters.map((character) => (
                    <View key={character.characterId} className="mb-4 bg-white rounded-lg shadow-md p-4">
                        <Text className="text-2xl font-semibold mb-2">{character.name}</Text>
                        <View className="justify-evenly items-center bg-gray-100 rounded-md p-3">
                            <View className="flex-row flex-wrap justify-evenly items-center">
                                <View className="w-1/2 mb-2">
                                    <Text className="text-gray-700 text-lg">Class:</Text>
                                    <Text className="font-semibold">{CharacterClassEnum[character.characterClass]}</Text>
                                </View>
                                <View className="w-1/2 mb-2">
                                    <Text className="text-gray-700 text-lg">Race:</Text>
                                    <Text className="font-semibold">{CharacterRaceEnum[character.characterRace]}</Text>
                                </View>
                                <View className="w-1/2">
                                    <Text className="text-gray-700 text-lg">Level:</Text>
                                    <Text className="font-semibold">{character.level}</Text>
                                </View>
                                <View className="w-1/2">
                                    <Text className="text-gray-700 text-lg">Health:</Text>
                                    <Text className="font-semibold">{character.health}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Pressable
                className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4"
                onPressIn={logout}>
                <Text className="text-white text-lg font-semibold text-center">Logout</Text>
            </Pressable>
        </View>
    );
}

export default UserHome;