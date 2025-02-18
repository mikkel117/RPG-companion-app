import { Stack, Link } from 'expo-router';
import React from 'react';
import { Text, View, TextInput, Button, Touchable, Pressable } from 'react-native';

import { Container } from '~/components/Container';

export default function Login() {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <Container>
        <View>
          <Text className="text-5xl text-rose-300">Login</Text>
          <TextInput
            className="m-2 rounded border border-gray-300 p-2"
            placeholder="User"
            value={user}
            onChangeText={setUser}
          />
          <TextInput
            className="m-2 rounded border border-gray-300 p-2"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4"
            onPressIn={() => console.log(`Login with ${user}:${password}`)}>
            <Text className="text-white text-lg font-semibold text-center">Login</Text>
          </Pressable>

        </View>

      </Container>
    </>
  );
}
