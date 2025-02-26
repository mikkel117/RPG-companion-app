import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLogin } from '~/contexts/LoginContext';
import { getUserById } from '~/apiCalls/apiUser';
import { userType } from "~/types";

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
        console.log(user);

        setLoggedIn(false);
        console.log('logged out');
    }

    return (
        <View>
            <Text>Welcome, {user?.username}</Text>
            <Text>User Home</Text>
            <Pressable
                className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4"
                onPressIn={logout}>
                <Text className="text-white text-lg font-semibold text-center">Logout</Text>
            </Pressable>
        </View>
    );
}

export default UserHome;