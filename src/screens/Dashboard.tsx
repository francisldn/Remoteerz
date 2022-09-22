import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Footer from '../components/Footer'

export default function Dashboard() {
  return (
    <>
    <ScrollView className="flex-1">
        <Text>Dashboard</Text>
    </ScrollView>
    <Footer screen="Dashboard" />
</>
  )
}