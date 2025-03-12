import { Redirect, Stack, Slot } from "expo-router";
import { useLogin } from "~/contexts/LoginContext";

export default function page() {
    const { loggedIn } = useLogin();

    if (!loggedIn) {
        return <Redirect href="/" />
    }

    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Slot />
            </Stack>
        </>
    )

}