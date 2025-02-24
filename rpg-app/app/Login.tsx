import { Stack, Link } from 'expo-router';
import React from 'react';
import { Text, View, TextInput, Button, Touchable, Pressable } from 'react-native';

import { Container } from '~/components/Container';

import { login } from '~/apiCalls/userLogin';
import { setCookie, getTokenUsingCookie, setTokenUsingStorage, getTokenUsingStorage } from '~/apiCalls/tokenHandling';

export default function Login() {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function test() {
    console.log(`Login with ${user}:${password}`);
    const foo = await login(user, password)
    if (!foo.success) {
      console.log("there was a error ", foo.error);
    } else {
      console.log("login success", foo);
      /* setCookie(foo.token); */
      //console.log('getToken:', getTokenUsingCookie());
      setTokenUsingStorage(foo.token);
      console.log('getToken:', await getTokenUsingStorage());
    }
  }

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
            onPressIn={() => test()}>
            <Text className="text-white text-lg font-semibold text-center">Login</Text>
          </Pressable>

        </View>

      </Container>
    </>
  );
}
