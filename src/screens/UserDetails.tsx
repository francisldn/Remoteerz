// @ts-nocheck
import { View, StyleSheet } from 'react-native'
import React from 'react'
import BottomSheetProfileView from '../components/BottomSheetProfileView';
import ProfileImageCard from '../components/ProfileImageCard';
import { placeholderImageURL } from './Profile';

export default function UserDetails({route}) {
  const userDetails = route.params;
  const imageURL = userDetails?.image || placeholderImageURL

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