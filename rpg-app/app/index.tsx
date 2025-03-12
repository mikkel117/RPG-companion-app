import { Stack, Link } from 'expo-router';
import { Text, Platform, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLogin } from '~/contexts/LoginContext';

import { getTokenUsingCookie, getTokenUsingStorage } from '~/functions/api/tokenHandling';

import { Container } from '~/components/Container';
import LoginModal from '~/components/LoginModal';
import UserHome from '~/components/UserHome';

export default function Home() {
  const { loggedIn, setLoggedIn } = useLogin();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getToken = async () => {
      const token = Platform.OS === 'android' || Platform.OS === 'ios' ? await getTokenUsingStorage() : getTokenUsingCookie();
      if (token != "") {
        setLoggedIn(true);
      }
      setLoading(false);
    }
    getToken();
  }, [])


  if (loading) {
    return (
      <Container>
        <View className="flex-1 justify-center items-center bg-gray-100">
          <Text className="text-5xl text-rose-800 text-center">Loading...</Text>
        </View>
      </Container>
    )
  }

  return (
    <>
      <Container>
        {loggedIn ? (
          <UserHome />
        ) : (
          <>
            <View className='
          flex-1 justify-center
          '>
              <Pressable
                className="m-2 bg-button rounded-[28px] shadow-md p-4"
                onPressIn={() => setShowLoginModal(true)}>
                <Text className="text-text text-lg font-semibold text-center">Login</Text>
              </Pressable>
            </View>

            <View className="flex items-end">

              <Link href="/Camera" className='m-2 bg-button rounded-[28px] shadow-md p-4 w-full text-center'>
                <Text className="text-text text-lg font-semibold">Kamera</Text>
              </Link>
            </View>
          </>
        )}


        <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </Container>
    </>
  );
}
