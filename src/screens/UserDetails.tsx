// @ts-nocheck
import { View, StyleSheet } from 'react-native'
import React from 'react'
import BottomSheetProfileView from '../components/BottomSheetProfileView';
import ProfileImageCard from '../components/ProfileImageCard';
import { chatService } from '../utils/chatService';

export default function UserDetails({route}) {
  const {placeholderImages} = chatService()
  const userDetails = route.params;
  const imageURL = userDetails?.image || placeholderImages[Math.round(Math.random())]

  return (
    <View style={styles.container}>
      <ProfileImageCard imageURL={imageURL}/>
      <BottomSheetProfileView userDetails={userDetails} preview={false}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#c3d5fe"
  },
})