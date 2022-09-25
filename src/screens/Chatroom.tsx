// @ts-nocheck
import { View, Text, FlatList } from 'react-native'
import React,{useState} from 'react'
import Footer from '../components/Footer';
import MessageBox from '../components/MessageBox';
import { chatService } from '../utils/chatService';

export default function Chatroom() {
  const {userChatDetails} = chatService()

  return (
    <>
      <FlatList 
                data={userChatDetails} 
                ListEmptyComponent={() => (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%',paddingTop:'20%'}}><Text>NO ITEMS TO DISPLAY</Text></View>)}
                renderItem={({item, index}) => <MessageBox key={index} chatroom={item}/>}
      />
    <Footer screen="Chatroom"/>
</>
  )
}