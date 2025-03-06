import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

type CharterStatProps = {
    stat: string
    value: number
    width: string
    setStat: (value: number) => void
    roll: (modifier: number) => void
}

const CharterStat = (props: CharterStatProps) => {

    const addToStat = () => {
        props.setStat(props.value + 1)
    }

    const subtractFromStat = () => {
        if (props.value > 0)
            props.setStat(props.value - 1)
    }

    return (
        <View className={`border-2 border-black p-2 rounded-md flex-row justify-between items-center flex-wrap ${props.width}`}>
            <Pressable onPress={subtractFromStat}>
                <Text className="text-xl font-semibold">-</Text>
            </Pressable>

            <Pressable onPress={() => props.roll(props.value)}>
                <Text className="text-xl font-semibold">{props.stat}: {props.value}</Text>
            </Pressable>

            <Pressable onPress={addToStat}>
                <Text className="text-xl font-semibold">+</Text>
            </Pressable>
        </View>
    )
}

export default CharterStat