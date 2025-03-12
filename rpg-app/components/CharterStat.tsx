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
        props.setStat(props.value - 1)
    }

    return (
        <View className={`bg-primary  p-2 rounded-md flex-row justify-between items-center flex-wrap ${props.width}`}>
            <Pressable onPress={subtractFromStat}>
                <Text className="text-xl font-semibold text-text">-</Text>
            </Pressable>

            <Pressable onPress={() => props.roll(props.value)}>
                <Text className="text-xl font-semibold text-text">{props.stat}: {props.value}</Text>
            </Pressable>

            <Pressable onPress={addToStat}>
                <Text className="text-xl font-semibold text-text">+</Text>
            </Pressable>
        </View>
    )
}

export default CharterStat