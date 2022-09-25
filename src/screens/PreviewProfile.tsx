// @ts-nocheck
import { View, StyleSheet } from 'react-native'
import React from 'react'
import BottomSheetProfileView from '../components/BottomSheetProfileView';
import ProfileImageCard from '../components/ProfileImageCard';
import { useAuth } from '../utils/useAuth';
import { chatService } from '../utils/chatService';
const initialValues = {
  username: 'Alicia',
  about: 'I live in London',
  interest: 'movies, travelling, tennis, swimming',
  sexual_orientation: 'straight',
  age: '30',
  gender:'female',
  job_title: 'freelance web developer',
  skills: 'CSS, HTML, Javascript',
  countries_travelled: 'France, Germany, UK, Ireland, Spain, USA',
  countries_lived: 'UK',
  favourite_cities:'Barcelona'
}

export default function PreviewProfile() {
  const {currentUserDetails} = useAuth()
  const {placeholderImages} = chatService()
  const imageURL = currentUserDetails?.image || placeholderImages[Math.round(Math.random())]
  return (
    <View style={styles.container}>
      <ProfileImageCard imageURL={imageURL}/>
      <BottomSheetProfileView userDetails={currentUserDetails} preview={true}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#c3d5fe"
  },
})