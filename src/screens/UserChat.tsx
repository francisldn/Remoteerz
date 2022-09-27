// @ts-nocheck
import {View, StyleSheet, Text, SafeAreaView, ScrollView, Dimensions, KeyboardAvoidingView} from 'react-native';
import React,{useState, useEffect, useRef} from 'react'
import { useAuth } from '../utils/useAuth';
import Footer from '../components/Footer';
import {Message} from '../utils/message'
import ChatBubble from '../components/ChatBubble';
import { sortMessageByDate } from '../utils/time';
import GlobalStyles from '../utils/GlobalStyles';
import ChatInputBar from '../components/ChatInputBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getChatsByChatroomId} from '../utils/chatService'
import { chatService } from '../utils/chatService';
import {useKeyboard} from '@react-native-community/hooks'
const screenHeight = Dimensions.get('window').height;

export default function UserChat({route}) {
    const {chatroom, chatUserName, chatUserId} = route.params
    const {userChatDetails} = chatService()
    const {chats} = chatroom;
    const [messages, setMessages] = useState(chats)
    const chatRef = useRef(null)
    const {keyboardHeight, keyboardShown} = useKeyboard()


    useEffect(() => {
      // user chat useffects -> check if useffect is called
      const newMessages = userChatDetails.find(room => room.uid === chatroom.uid).chats
      setMessages(newMessages)
    },[userChatDetails])



    if(!chats || chats ===[]) {
      return (
      <View style={styles.emptyContainer}>
      <Text style={GlobalStyles.CustomFont}>START CHATTING WITH 
        <View className="pl-3 self-end -mt-2">
          <Text style={GlobalStyles.CustomFont} className="text-[#4759ff] font-bold text-2xl">{chatUserName}</Text>
        </View>
      </Text>
    </View>)
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAwareScrollView 
        contentContainerStyle={{flex:1}}
        style={{flex:1}}
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        extraScrollHeight={50}
        viewIsInsideTabBar
        onKeyboardWillShow={() => {
          console.log('will show')
          chatRef.current.setNativeProps({
            paddingTop:keyboardHeight,
          })
        }}
        enableAutomaticScroll={true}
        onKeyboardWillHide={() => {
          console.log('will hide')
          chatRef.current.setNativeProps({
            marginTop:0,
            paddingTop:0
          })
        }}
        >
        <ScrollView 
          ref={chatRef}
          style={styles.chatContainer}>
            {messages.map((message,index)=> <ChatBubble  key={index} singleMsg={message}/>)}
        </ScrollView>
       
          <ChatInputBar chatroom={chatroom} chatUserName={chatUserName} chatUserId={chatUserId}/>

       
      {/* <FlatList  
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
        /> */}
        </KeyboardAwareScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    chatContainer: {
        maxHeight:screenHeight-200,
        flex:1
    },
    emptyContainer: {
        display:'flex',  
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
    }
})