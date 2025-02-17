import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import "../../global.css";

export default function HomeScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-blue-500'>
      <Text className='text-white'>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
