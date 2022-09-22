import { View, Text } from 'react-native'
import React from 'react'
import BottomIcon from './BottomIcon'
import { useNavigation } from '@react-navigation/native'

export default function Footer() {
    const navigation = useNavigation()
  return (
    <View className="flex flex-row">
        <BottomIcon iconName="" text="Dashboard" pressHandler={() => navigation.navigate('Dashboard')} />
    </View>
  )
}