import { View, Text, Modal } from 'react-native'
import React from 'react'

type rollType = {
  total: number;
  modifier: number;
  rolls: number[];
}

interface ShowRollModelProps {
  roll: rollType;
  visible: boolean;
  onClose: () => void;
}


const ShowRollModal: React.FC<ShowRollModelProps> = ({ visible, onClose, roll }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      pointerEvents='none'
    >
      <View className="flex-1 justify-end items-start" pointerEvents='none'>
        <View className="w-96 h-24 bg-slate-600 flex justify-center items-center p-4" pointerEvents='auto'>
          <Text className="text-5xl text-white text-center">{roll.rolls[0]}+{roll.modifier}</Text>
          <Text>1d20+{roll.modifier}</Text>
        </View>
      </View>

    </Modal>
  )
}

export default ShowRollModal