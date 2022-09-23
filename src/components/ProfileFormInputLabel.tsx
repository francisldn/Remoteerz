import { View, Text } from 'react-native'
import React from 'react'
import GlobalStyles from '../utils/GlobalStyles'

interface ProfileFormInputLabelProps {
  inputLabel:string;
}

export default function ProfileFormInputLabel({inputLabel}:ProfileFormInputLabelProps) {
  return (
    <View className="pl-[4%]">
        <Text 
            style={GlobalStyles.CustomFont}
            className="text-md"
        >
            {inputLabel}
        </Text>
    </View>
  )
}