// @ts-nocheck
import { View } from 'react-native'
import React from 'react'
import LoginForm from '../components/LoginForm';
import FrontAnimation from '../components/FrontAnimation';

export default function Login() {
  return (
    <View className="bg-white h-full">
      <View className="self-center pt-[5%] border-orange-700">
        <FrontAnimation />
      </View>
      <LoginForm />
    </View>
  )
}