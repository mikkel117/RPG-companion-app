import { Stack, Link } from 'expo-router';
import React from 'react';
import { Text, View, TextInput, Button, Touchable, Pressable, Platform } from 'react-native';

import { Container } from '~/components/Container';



export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <Container>
        <View>
          <Text className="text-5xl text-rose-300">Login</Text>
        </View>

      </Container>
    </>
  );
}
