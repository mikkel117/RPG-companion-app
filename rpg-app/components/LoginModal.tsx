import { Text, Platform, Modal, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import { login } from '~/apiCalls/userLogin';
import { setCookie, setTokenUsingStorage, } from '~/apiCalls/tokenHandling';

interface LoginModelProps {
    visible: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModelProps> = ({ visible, onClose }) => {

    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(false);

    async function handleLogin() {
        if (user === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }
        setFetching(true);
        const loginData = await login(user, password);
        if (!loginData.success) {
            console.log("there was a error ", loginData.error);
        } else {
            Platform.OS === 'android' ? setTokenUsingStorage(loginData.token) : setCookie(loginData.token);
        }
        setFetching(false);
        closeModal();
    }

    function closeModal() {
        setError('');
        setUser('');
        setPassword('');
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
                <View className='w-80 bg-white rounded-2xl p-6 shadow-lg'>
                    <View className='flex-row items-center justify-between w-full px-4'>
                        <Text className="text-3xl text-black">Login</Text>
                        <Pressable onPress={closeModal} className='-mr-2'>
                            <Text className='text-2xl text-gray-500'>X</Text>
                        </Pressable>
                    </View>
                    <TextInput
                        className="m-2 rounded border border-gray-300 p-2"
                        placeholder="User"
                        value={user}
                        onChangeText={setUser}
                    />
                    <TextInput
                        className="m-2 rounded border border-gray-300 p-2"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    {error && <Text className="text-red-500 mt-2">{error}</Text>}

                    <Pressable
                        className={`m-2 rounded-[28px] shadow-md p-4 ${fetching ? 'bg-gray-400' : 'bg-indigo-500'}`}
                        onPressIn={() => handleLogin()}
                        disabled={fetching}>
                        {fetching ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white text-lg font-semibold text-center">Login</Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default LoginModal;