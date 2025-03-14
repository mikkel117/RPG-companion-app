import { View, Text, Pressable } from 'react-native'
import React from 'react'

type ButtonProps = {
    title: string
    onPress: () => void
    width?: string
}

const Button: React.FC<ButtonProps> = ({ title, onPress, width }) => {
    return (
        <Pressable
            onPress={onPress}
            className={`m-2 bg-button rounded-[28px] shadow-md p-4 ${width ?? ''}`}>
            <Text className='text-text text-lg font-semibold text-center'>{title}</Text>
        </Pressable>
    )
}

export default Button