import { Stack, Link } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Text className="text-5xl text-rose-300">Home</Text>
        <Link href="/Login">click me</Link>
      </Container>
    </>
  );
}
