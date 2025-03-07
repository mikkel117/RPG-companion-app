import { View, Text, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'

type rollType = {
  total: number;
  modifier: number;
  rolls: number[];
}

interface ShowRollModelProps {
  roll: rollType;
}


const ShowRollModal: React.FC<ShowRollModelProps> = ({ roll }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setShowModal(true);
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 2000);
    console.log('timer:', timer);

    return () => clearTimeout(timer);
  }, [roll])

  if (!showModal) return null;

  return (
    <View className="w-52 h-24 absolute bottom-0 left-0 bg-slate-600">
      <View className=' flex flex-row items-center p-4 w-full h-full'>

        <View className="flex-1">
          <Text className="text-5xl text-white">{roll.rolls[0]}+{roll.modifier}</Text>
          <Text className='text-white'>1d20+{roll.modifier}</Text>
        </View>

        <View className=''>
          <Text className='text-white text-2xl'>= {roll.total}</Text>
        </View>

      </View>
    </View>
  )
}

export default ShowRollModal