import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";

import { useLogin } from '~/contexts/LoginContext';

import { getUserById } from '~/functions/api/apiUser';
import { clearCookies, clearTokenUsingStorage } from "~/functions/api/tokenHandling";
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
                setUser(userData.data);
            }
        }
        fetchUser();
    }, [])

    const logout = () => {
        if (Platform.OS === 'android') {
            clearTokenUsingStorage();
        } else {
            clearCookies();
        }
        setLoggedIn(false);
    }

    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between bg-gray-100 w-full">
                <Text className="text-xl font-bold">Welcome, {user?.username}</Text>
                <Pressable
                    className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-2 ml-1.5"
                    onPressIn={logout}>
                    <Text className="text-white font-semibold text-center">Logout</Text>
                </Pressable>
            </View>

            <View className="border-b-4 border-black my-4"></View>

            <ScrollView className="flex-1">
                {user?.characters?.length ? (
                    user.characters.map((character) => (
                        <View key={character.characterId} className="mb-4 bg-white rounded-lg shadow-md p-4">

                            <View className="flex-row">
                                <Link href={`/charter/${character.characterId}`} className="mb-2">
                                    <Text className="text-2xl font-semibold mb-2">{character.name}</Text>
                                </Link>
                            </View>

                            <View className="justify-evenly items-center bg-gray-200 rounded-md p-3">

                                <View className="flex-row flex-wrap justify-evenly items-center">
                                    <View className="w-1/2 mb-2">
                                        <Text className="text-black font-bold text-lg">Class:</Text>
                                        <Text className="font-semibold">{CharacterClassEnum[character.characterClass]}</Text>
                                    </View>

                                    <View className="w-1/2 mb-2">
                                        <Text className="text-black font-bold text-lg">Race:</Text>
                                        <Text className="font-semibold">{CharacterRaceEnum[character.characterRace]}</Text>
                                    </View>

                                    <View className="w-1/2">
                                        <Text className="text-black font-bold text-lg">Level:</Text>
                                        <Text className="font-semibold">{character.level}</Text>
                                    </View>

                                    <View className="w-1/2">
                                        <Text className="text-black font-bold text-lg">Health:</Text>
                                        <Text className="font-semibold">{character.health}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    ))) : (
                    <Text className="text-center text-2xl font-semibold">No characters found</Text>
                )

                }
            </ScrollView>

            <View className="border-b-4 border-black my-4"></View>
            <Pressable className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-2 ml-1.5">
                <Text className="text-white font-semibold text-center">Create Character</Text>
            </Pressable>


        </View>
    );
}

export default UserHome;