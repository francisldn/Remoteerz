import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Footer from '../components/Footer'
export default function Hangouts() {
  return (
    <>
    <ScrollView className="flex-1">
        <Text>Hangouts</Text>
    </ScrollView>
    <Footer screen="Hangouts"/>
</>
  )
}