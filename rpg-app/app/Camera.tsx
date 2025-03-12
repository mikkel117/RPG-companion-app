import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'

import { Container } from '~/components/Container'

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permissions, requestPermission] = useCameraPermissions();

    if (!permissions) {
        return <View />
    }

    if (!permissions.granted) {
        return (
            <Container>
                <View>
                    <Text>Kameratilladelser påkrævet</Text>
                    <Button title="Anmod om tilladelse" onPress={requestPermission} />
                </View>
            </Container>
        )
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }


    return (
        <Container>
            <View className='flex flex-1 h-56'>
                <CameraView facing={facing} className='w-full h-full'>
                    <View>
                        <TouchableOpacity onPress={toggleCameraFacing}>
                            <Text>vænd kamera</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </Container>
    )
}