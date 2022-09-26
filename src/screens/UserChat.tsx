// @ts-nocheck
import {View, StyleSheet, Text, FlatList, Dimensions} from 'react-native';
import React,{useState, useEffect} from 'react'
import { useAuth } from '../utils/useAuth';
import Footer from '../components/Footer';
import {Message} from '../utils/message'
import ChatBubble from '../components/ChatBubble';
import { sortMessageByDate } from '../utils/time';
import GlobalStyles from '../utils/GlobalStyles';
import ChatInputBar from '../components/ChatInputBar';

export default function UserChat({route}) {
    const {chatroom, chatUserName, chatUserId} = route.params
    const {chats} = chatroom;

  return (
    <>
      <FlatList  
            contentContainerStyle={styles.chatContainer}
            data={chats ? chats : []} // need to change
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={GlobalStyles.CustomFont}>START CHATTING WITH 
                  <View className="pl-3 self-end -mt-2">
                    <Text style={GlobalStyles.CustomFont} className="text-[#4759ff] font-bold text-2xl">{chatUserName}</Text>
                  </View>
                </Text>
              </View>
            )}
            renderItem={({item, index}) => <ChatBubble key={index} singleMsg={item}/>}
        />

        <ChatInputBar chatroom={chatroom} chatUserName={chatUserName} chatUserId={chatUserId}/>
      
    </>
  )
}

const styles = StyleSheet.create({
    chatContainer: {
        display: 'flex',
        flex: 1,
        width: '100%',
        borderWidth:2,
        borderColor:'red',


    },
    emptyContainer: {
        display:'flex',  
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
    }
})