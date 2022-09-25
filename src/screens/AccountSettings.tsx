import { View, Text } from 'react-native'
import React from 'react';
import AuthButton from '../components/AuthButton';
import { useAuth } from '../utils/useAuth';

export default function AccountSettings() {
  const {logout} = useAuth();
  return (
    <View>
      <AuthButton btnText={"Logout"} btnAction={async () => await logout()} />
    </View>
  )
}