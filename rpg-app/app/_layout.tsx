import '../global.css';
import LoginProvider from '~/contexts/LoginContext';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <LoginProvider>
      <Stack />
    </LoginProvider>
  )
}
