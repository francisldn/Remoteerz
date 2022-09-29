// @ts-nocheck
import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import BottomIcon from './BottomIcon'
import { useNavigation } from '@react-navigation/native';

export default function Footer({screen}) {
    const navigation = useNavigation()
  return (
    <View className="flex flex-row justify-around bg-white h-[12%]">
        <BottomIcon iconName="dashboard" text="Dashboard" iconMarginLeft={7} pressHandler={() => navigation.navigate('Dashboard')} iconColor={screen === 'Dashboard'}/>
        <BottomIcon iconName="emoji-people" text="Hangouts" pressHandler={() => navigation.navigate('Hangouts')} iconColor={screen === 'Hangouts'} />
        <BottomIcon iconName="chat" text="Chats" textMarginLeft={5}  pressHandler={() => navigation.navigate('Chatroom')} iconColor={screen === 'Chatroom' }/>
        <BottomIcon iconName="person" text="Profile" textMarginLeft={5}  pressHandler={() => navigation.navigate('Profile')} iconColor={screen === 'Profile' }/>
    </View>
  )
}