// @ts-nocheck
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Footer from '../components/Footer';
import ImageList from '../components/ImageList';
import DashboardLabel from '../components/DashboardLabel';
import { exCurrentUserFromList, myFriendsList } from '../utils/helperFunctions';
import { useAuth } from '../utils/useAuth';
import { chatService } from '../utils/chatService';
import GlobalStyles from '../utils/GlobalStyles';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const {chatUsers} = chatService()
  const {currentUserDetails} = useAuth()
  const userId = currentUserDetails?.uid

//   if(!chatUsers || !currentUserDetails) return (
//     <ScrollView style={{flex:1}} contentContainerStyle={{display:'flex',paddingTop:'50%'}}>
//       <View>
//           <LoadingSpinner size={"large"}/>
//       </View>
//     </ScrollView>
// )


  if( !chatUsers || !currentUserDetails) return (
    
    <ScrollView style={{flex:1}} contentContainerStyle={{display:'flex',paddingTop:'50%'}}>
        <View>
            <LoadingSpinner size={"large"}/>
        </View>
    </ScrollView>
  )

  const allUsers = chatUsers || []
  const myFriends = myFriendsList(chatUsers, currentUserDetails) || []
  
  return (
  <>
    <ScrollView style={{flex:1}}>
      <ImageList filterList={allUsers} sectionLabel={"Hangouts"} iconName={"ios-people-sharp"}/>
      <ImageList filterList={myFriends} sectionLabel={"My Friends"} iconName={"ios-people-sharp"}/>
      <DashboardLabel sectionLabel={"Events"} iconName={"ios-calendar"}/>
      <View className="pt-[2%] pl-[2%]">
            <Text style={GlobalStyles.CustomFont} className="text-xl">MORE EVENTS COMING SOON...</Text>
        </View>
    </ScrollView>
    <Footer screen="Dashboard" />
  </>
  )
}