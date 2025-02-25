import { Stack, Link } from 'expo-router';
import { Text, Platform, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Container } from '~/components/Container';
import LoginModal from '~/components/LoginModal';
import { getTokenUsingCookie, getTokenUsingStorage } from '~/apiCalls/tokenHandling';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
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
        <Text className="text-5xl text-rose-300">Home</Text>
        {/* <Link href="/Login">click me</Link> */}
        <Text>{loggedIn ? 'logged in' : 'not logged in'}</Text>

        <Pressable
          className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4"
          onPressIn={() => setShowLoginModal(true)}>
          <Text className="text-white text-lg font-semibold text-center">Login</Text>
        </Pressable>

        <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </Container>
    </>
  );
}
