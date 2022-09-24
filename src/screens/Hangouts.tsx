import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Footer from '../components/Footer'
import HangoutCardList from '../components/HangoutCardList';
export default function Hangouts() {
  return (
    <>
      <HangoutCardList />
      <Footer screen="Hangouts"/>
    </>
  )
}