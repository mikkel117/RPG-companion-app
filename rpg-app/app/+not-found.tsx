import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text className={styles.title}>denne side findes ikke.</Text>
        <Link href="/" className={styles.link}>
          <Text className={styles.linkText}>Gå hjem</Text>
        </Link>
      </Container>
    </>
  );
}

const styles = {
  title: `text-xl font-bold`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
};
