import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import '../global.css';
import LoginProvider from '~/contexts/LoginContext';
import { getTokenUsingStorage, getTokenUsingCookie } from '~/apiCalls/tokenHandling';

import { Slot, Stack } from 'expo-router';

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
      if (token != "") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/');
      }
    }
    getToken();
  }, []);

  return (
    <LoginProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </LoginProvider>
  )
}
