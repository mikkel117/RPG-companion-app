import { Stack, Link } from 'expo-router';
import { Text, Platform, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLogin } from '~/contexts/LoginContext';

import { Container } from '~/components/Container';
import LoginModal from '~/components/LoginModal';
import { getTokenUsingCookie, getTokenUsingStorage } from '~/apiCalls/tokenHandling';

export default function Home() {
  const { loggedIn, setLoggedIn } = useLogin();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  useEffect(() => {
    const getToken = async () => {

      const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
      console.log(token);

      if (token != "") {
        setLoggedIn(true);
      }
    }
    getToken();
  }, [])
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        {/* <Text className="text-5xl text-rose-300">Home</Text> */}
        {/* <Link href="/Login">click me</Link> */}
        {loggedIn ? (

          <View className='
          flex-1 justify-center items-center bg-gray-100
          '>
            <Text className="text-5xl text-rose-300 text-center">loggedIn</Text>
          </View>
        ) : (

          <View className='
          flex-1 justify-center bg-gray-100
          '>
            <Pressable
              className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4"
              onPressIn={() => setShowLoginModal(true)}>
              <Text className="text-white text-lg font-semibold text-center">Login</Text>
            </Pressable>
          </View>
        )}

        <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </Container>
    </>
  );
}
