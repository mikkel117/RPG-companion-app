import { Text, Platform, Modal, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import { login, createUser } from '~/functions/api/userLogin';
import { setCookie, setTokenUsingStorage, } from '~/functions/api/tokenHandling';
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
            Platform.OS === 'android' || Platform.OS === 'ios' ? setTokenUsingStorage(loginData.token) : setCookie(loginData.token);
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
                <View className='w-11/12 h-[500px] bg-primary rounded-2xl p-6 shadow-lg'>
                    <View className='flex-row items-center justify-between w-full px-4'>
                        <Text className="text-3xl text-text">{isSignUp ? "Sign up" : "Login"}</Text>
                        <Pressable onPress={closeModal} className='-mr-2'>
                            <Text className='text-2xl text-text'>X</Text>
                        </Pressable>
                    </View>
                    <View className='flex-1 justify-center'>

                        <TextInput
                            className="m-2 h-14 text-xl rounded border p-4 text-text border-text"
                            placeholder="Bruger navn"
                            placeholderTextColor="#F4F4F4"
                            value={user}
                            onChangeText={setUser}
                        />
                        <TextInput
                            className="m-2 h-14 text-xl rounded border border-text p-4 text-text"
                            placeholder="Password"
                            placeholderTextColor="#F4F4F4"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />

                        {error !== '' && <Text className="text-red-500 text-center">{error}</Text>}
                    </View>


                    <Text className="text-center text-text mt-2">
                        {isSignUp ? "har du en konto?" : "har ikke en konto?"}
                        <Pressable onPress={() => setIsSignUp(!isSignUp)} className="text-indigo-500">
                            <Text> {isSignUp ? "Login" : "Sign up"} </Text>
                        </Pressable>
                    </Text>

                    <View className='pb-4'>
                        <Pressable
                            className={`m-2 rounded-[28px] shadow-md p-4 ${fetching ? 'bg-muted' : 'bg-button'}`}
                            onPressIn={() => isSignUp ? handleSignUp() : handleLogin()}
                            disabled={fetching}>
                            {fetching ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-text text-lg font-semibold text-center"> {isSignUp ? "Sign up" : "Login"} </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LoginModal;