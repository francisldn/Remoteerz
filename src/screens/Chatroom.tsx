import { View, Text, FlatList } from 'react-native'
import React,{useState} from 'react'
import Footer from '../components/Footer';
import {Message} from '../utils/message'
import MessageBox from '../components/MessageBox';

export default function Chatroom() {
  const [messages, setMessages] = useState(Message)
  const [userA, setUserA] = useState('')
  return (
    <>
      <FlatList 
                data={messages} 
                ListEmptyComponent={() => (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%',paddingTop:'20%'}}><Text>NO ITEMS TO DISPLAY</Text></View>)}
                renderItem={({item, index}) => <MessageBox key={index} avatar={''} name={item.name} msg={item.messages[item.messages.length-1].message} datetime={item.messages[item.messages.length-1].timeStamp}/>}
      />
    <Footer screen="Chatroom"/>
</>
  )
}