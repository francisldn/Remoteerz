// @ts-nocheck
import { View, Text } from 'react-native'
import React, {useState} from 'react'
import LargeAvatar from '../components/LargeAvatar';
import BottomSheetProfileView from '../components/BottomSheetProfileView';
import { useAuth } from '../utils/useAuth';

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

export default function PreviewProfile({route}) {
  const {currentUserDetails} = useAuth()
  const [userData, setUserData] = useState(currentUserDetails || route.params || initialValues)
  
  return (
    <>
      <BottomSheetProfileView userData={userData} setUserData={setUserData}/>
    </>
  )
}