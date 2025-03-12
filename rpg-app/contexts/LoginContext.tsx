import { Platform, View, Text } from 'react-native';
import React, { createContext, useState, useEffect } from 'react';

import { getTokenUsingStorage, getTokenUsingCookie } from "~/functions/api/tokenHandling";

interface LoginContextProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextProps | undefined>(undefined);


export const useLogin = () => {
    const context = React.useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
}


interface LoginProviderProps {
    children: React.ReactNode;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = Platform.OS === 'android' || Platform.OS === 'ios' ? await getTokenUsingStorage() : getTokenUsingCookie();
            if (token != "") {
                setLoggedIn(true);
            }
            setLoading(false);
        }
        checkLoginStatus();
    }, [])

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <Text className="text-5xl text-rose-800 text-center">Loading...</Text>
            </View>
        )
    }

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;