import { Text, Platform, Modal, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import { login, createUser } from '~/apiCalls/userLogin';
import { setCookie, setTokenUsingStorage, } from '~/apiCalls/tokenHandling';
import { useLogin } from '~/contexts/LoginContext';

interface LoginModelProps {
    visible: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModelProps> = ({ visible, onClose }) => {

    const { setLoggedIn } = useLogin();
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    useEffect(() => {
        setUser('');
        setPassword('');
    }, [isSignUp])

    async function handleLogin() {
        if (user === '' || password === '') {
            setError('udfyld venligst alle felter');
            return;
        }
        setFetching(true);
        const loginData = await login(user, password);
        if (!loginData.success) {
            setError(loginData.error ? loginData.error : 'An error occurred, please try again');
        } else {
            Platform.OS === 'android' ? setTokenUsingStorage(loginData.token) : setCookie(loginData.token);
            setLoggedIn(true);
            closeModal();
        }
        setFetching(false);
    }

    async function handleSignUp() {
        if (user === '' || password === '') {
            setError('udfyld venligst alle felter');
            return;
        }
        setFetching(true);
        const loginData = await createUser(user, password);
        if (!loginData.success) {
            setError(loginData.error ? loginData.error : 'An error occurred, please try again');
            setFetching(false);
        } else {
            handleLogin();
        }

    }

    function closeModal() {
        setError('');
        setUser('');
        setPassword('');
        setIsSignUp(false);
        onClose();
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View className='
            flex-1
            justify-center
            items-center
            bg-black/50
            '>
                <View className='w-11/12 h-[500px] bg-white rounded-2xl p-6 shadow-lg'>
                    <View className='flex-row items-center justify-between w-full px-4'>
                        <Text className="text-3xl text-black">{isSignUp ? "Sign up" : "Login"}</Text>
                        <Pressable onPress={closeModal} className='-mr-2'>
                            <Text className='text-2xl text-gray-500'>X</Text>
                        </Pressable>
                    </View>
                    <View className='flex-1 justify-center'>

                        <TextInput
                            className="m-2 h-14 text-xl rounded border p-4 text-black border-black"
                            placeholder="User"
                            placeholderTextColor="gray"
                            value={user}
                            onChangeText={setUser}
                        />
                        <TextInput
                            className="m-2 h-14 text-xl rounded border border-black p-4 text-black"
                            placeholder="Password"
                            placeholderTextColor="gray"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />

                        {error !== '' && <Text className="text-red-500 text-center">{error}</Text>}
                    </View>


                    <Text className="text-center text-gray-500 mt-2">
                        {isSignUp ? "har du en konto?" : "har ikke en konto?"}
                        <Pressable onPress={() => setIsSignUp(!isSignUp)} className="text-indigo-500">
                            <Text> {isSignUp ? "Login" : "Sign up"} </Text>
                        </Pressable>
                    </Text>

                    <View className='pb-4'>
                        <Pressable
                            className={`m-2 rounded-[28px] shadow-md p-4 ${fetching ? 'bg-gray-400' : 'bg-indigo-500'}`}
                            onPressIn={() => isSignUp ? handleSignUp() : handleLogin()}
                            disabled={fetching}>
                            {fetching ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white text-lg font-semibold text-center"> {isSignUp ? "SIgn up" : "Login"} </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LoginModal;