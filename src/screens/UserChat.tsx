// @ts-nocheck
import {View, StyleSheet, Text, FlatList} from 'react-native';
import React,{useState, useEffect} from 'react'
import { useAuth } from '../utils/useAuth';
import Footer from '../components/Footer';
import {Message} from '../utils/message'
import ChatBubble from '../components/ChatBubble';
import { sortMessageByDate } from '../utils/time';

export default function UserChat({route}) {
    const {currentUserDetails} = useAuth();
    const userDetails = route.params
    const [messages, setMessages] = useState(Message)
    const [userA, setUserA] = useState('')

    useEffect(() => {
        // function fetchMessage () {
        //     setMessages(Message)
        // }
        // fetchMessage()
        if(Message.length>0) {
            setMessages(Message)
            setUserA(messages[0].name)
        } else {
            setMessages([])
            setUserA('')
        }

    },[])

  return (
    <>
      <FlatList  
            style={styles.chatContainer}
            data={messages.length > 0 ? sortMessageByDate(messages[0].messages) : []} // need to change
            ListEmptyComponent={() => (<View style={styles.emptyContainer}><Text>NO ITEMS TO DISPLAY</Text></View>)}
            renderItem={({item, index}) => <ChatBubble key={index} chatMsg={item.message} userA={userA} user={item.name} dateTime={item.timeStamp}/>}
        />
      <Footer screen="Hangouts"/>
    </>
  )
}

const styles = StyleSheet.create({
    chatContainer: {
        marginTop: '10%',
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    emptyContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        height:'100%',
        paddingTop:'20%'
    }
})