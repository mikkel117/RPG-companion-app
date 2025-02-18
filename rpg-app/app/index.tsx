import { Stack, Link } from 'expo-router';
import { Text } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Text className="text-5xl text-rose-300">Home</Text>
      </Container>
    </>
  );
}
