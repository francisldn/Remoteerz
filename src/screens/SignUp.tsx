import { View, Text } from 'react-native'
import React from 'react'
import SignUpForm from '../components/SignUpForm'
import FrontAnimation from '../components/FrontAnimation'
export default function SignUp() {
  return (
    <View className="bg-white h-full">
      <View className="mx-auto pt-[5%]">
        <FrontAnimation/>
      </View>
      <SignUpForm />
    </View>
  )
}