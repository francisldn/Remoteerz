// @ts-nocheck
import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import BottomIcon from './BottomIcon'
import { useNavigation } from '@react-navigation/native';

export default function Footer({screen}) {
    const navigation = useNavigation()
  return (
    <View className="flex flex-row justify-around bg-white h-[12%]">
        {screen === 'Dashboard'
            ? <BottomIcon iconName="dashboard" text="Dashboard" iconMarginLeft={7} pressHandler={() => navigation.navigate('Dashboard')} iconColor={true}/>
            : <BottomIcon iconName="dashboard" text="Dashboard" iconMarginLeft={7} pressHandler={() => navigation.navigate('Dashboard')} />}
        {screen === 'Hangouts' 
            ? <BottomIcon iconName="emoji-people" text="Hangouts" pressHandler={() => navigation.navigate('Hangouts')} iconColor={true} />
            : <BottomIcon iconName="emoji-people" text="Hangouts" pressHandler={() => navigation.navigate('Hangouts')} />}
        {screen === 'Chatroom' 
            ? <BottomIcon iconName="chat" text="Chats" textMarginLeft={5}  pressHandler={() => navigation.navigate('Chatroom')} iconColor={true}/>
            : <BottomIcon iconName="chat" text="Chats" textMarginLeft={5}  pressHandler={() => navigation.navigate('Chatroom')} />}
        {screen === 'Profile' 
            ? <BottomIcon iconName="person" text="Profile" textMarginLeft={5}  pressHandler={() => navigation.navigate('Profile')} iconColor={true}/>
            : <BottomIcon iconName="person" text="Profile" textMarginLeft={5}  pressHandler={() => navigation.navigate('Profile')} />}
    </View>
  )
}