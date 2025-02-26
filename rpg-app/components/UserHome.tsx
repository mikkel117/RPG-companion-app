import { View, Text, Pressable } from "react-native";
import { useLogin } from '~/contexts/LoginContext';

const UserHome = () => {
    const { setLoggedIn } = useLogin();

    const logout = () => {
        setLoggedIn(false);
        console.log('logged out');

    }

    return (
        <View>
            <Text>User Home</Text>
            <Pressable
                className="m-2 bg-indigo-500 rounded-[28px] shadow-md p-4"
                onPressIn={logout}>
                <Text className="text-white text-lg font-semibold text-center">Logout</Text>
            </Pressable>
        </View>
    );
}

export default UserHome;