// @ts-nocheck
import { View, Text, Alert } from 'react-native'
import React from 'react';
import AuthButton from '../components/AuthButton';
import { useAuth } from '../utils/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function AccountSettings() {
  const {logout} = useAuth();
  const navigation = useNavigation()

  const handleLogout = async () => {
    try {
      await logout();
      console.log('user logged out successfully');
      Alert.alert('Logged out successfully');
      navigation.navigate('Login')
    } catch (error) {
      console.log(error)
      Alert.alert('Logged out unsuccessful. Please try again.')
    }
  }

  return (
    <View className="w-[95%] mx-auto pt-[10%]">
      <AuthButton btnText={"Logout"} btnAction={handleLogout} />
    </View>
  )
}