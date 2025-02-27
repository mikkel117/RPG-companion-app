import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function page() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Charter {id}</Text>
        </View>
    );
}
