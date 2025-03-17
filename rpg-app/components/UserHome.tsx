import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";

import { useLogin } from '~/contexts/LoginContext';
import { deleteCharacter } from "~/functions/api/apiCharacter";

import Button from '~/components/Button';

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

    const deleteC = async (characterId: number) => {
        if (!user) return;
        const response = await deleteCharacter(characterId);
        if (!response.success) {
            console.log("something went wrong");
            return;
        }
        else {

            const filteredCharacters = user.characters.filter(character => character.characterId !== characterId);
            const newUser: userType = {
                ...user,
                characters: filteredCharacters,
                id: user.id,
                username: user.username
            };
            setUser(newUser);
        }
    }

    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between w-full">
                <Text className="text-xl font-bold text-text ml-5">{user?.username}</Text>
                <Button title="Log ud" onPress={logout} />
            </View>

            <View className="border-b-4 border-secondary my-4"></View>

            <ScrollView className="flex-1">
                {user?.characters?.length ? (
                    user.characters.map((character) => (
                        <View key={character.characterId} className="mb-4 bg-secondary rounded-lg shadow-md p-4">

                            <View className="flex-row justify-between items-center">
                                <Link href={`/charter/${character.characterId}`} className="mb-2">
                                    <Text className="text-2xl font-semibold mb-2 text-text">{character.name}</Text>
                                </Link>

                                <Button title="Slet" onPress={() => deleteC(character.characterId)} width="w-1/6" />
                            </View>

                            <View className="justify-evenly items-center bg-gray-500 rounded-md p-3">

                                <View className="flex-row flex-wrap justify-evenly items-center">
                                    <View className="w-1/2 mb-2">
                                        <Text className="text-text font-bold text-lg">Klasse:</Text>
                                        <Text className="font-semibold text-text">{CharacterClassEnum[character.characterClass]}</Text>
                                    </View>

                                    <View className="w-1/2 mb-2">
                                        <Text className="text-text font-bold text-lg">Rase:</Text>
                                        <Text className="font-semibold text-text">{CharacterRaceEnum[character.characterRace]}</Text>
                                    </View>

                                    <View className="w-1/2">
                                        <Text className="text-text font-bold text-lg">Level:</Text>
                                        <Text className="font-semibold text-text">{character.level}</Text>
                                    </View>

                                    <View className="w-1/2">
                                        <Text className="text-text font-bold text-lg">Liv:</Text>
                                        <Text className="font-semibold text-text">{character.health}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    ))) : (
                    <Text className="text-center text-2xl font-semibold">Der bliv ikke fundet nogle karkter</Text>
                )

                }
            </ScrollView>

            <View className="border-b-4 border-secondary my-4"></View>
            <View>

            </View>

            <View className="flex-row items-center justify-between w-full">
                <Link href="/createCharter" className="m-2 bg-button rounded-[28px] shadow-md p-4 w-full text-center">
                    <Text className="text-text text-lg font-semibold">Opret karakter</Text>
                </Link>
            </View>


        </View>
    );
}

export default UserHome;