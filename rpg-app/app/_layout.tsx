import '../global.css';
import LoginProvider from '~/contexts/LoginContext';

import { Slot, Stack } from 'expo-router';

export default function Layout() {
  return (
    <LoginProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </LoginProvider>
  )
}
