import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Footer from '../components/Footer';

export default function Chatroom() {
  return (
    <>
    <ScrollView className="flex-1">
        <Text>Profile</Text>
    </ScrollView>
    <Footer screen="Chatroom"/>
</>
  )
}