// @ts-nocheck
import { View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Dimensions } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup';
import { createSingleChat, updateSingleChatroom } from '../utils/chatService';
import { chatService } from '../utils/chatService';
import { useAuth } from '../utils/useAuth';
import GlobalStyles from '../utils/GlobalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ChatInputBar({chatroom, chatUserName, chatUserId}) {
  const {userChatDetails, setUserChatDetails, chatUsers, userChat} = chatService()
  const {currentUserDetails} = useAuth()

  const chatUserDetails = {
    uid: chatUserId,
    username: chatUserName
  }

  const ChatInputSchema = yup.object().shape({
    message: yup
    .mixed()
    .optional()
  })

  const screenHeight = Dimensions.get('window').height;

  return (
    <KeyboardAwareScrollView 
      //https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/222
      keyboardShouldPersistTaps="handled"
      keyboardOpeningTime={20}
      extraScrollHeight={55}
      contentContainerStyle={{height:'10%'}}
      enableResetScrollToCoords={true}
      >
       <Formik
          initialValues={{message: ''}}
          validationSchema={ChatInputSchema}
          onSubmit={async (values, {resetForm}) => {
            console.log(values)
              try{
                  const singleChat = createSingleChat(values,chatroom.uid, chatUserDetails, currentUserDetails)
                  // create new user chat details to update state
                  chatroom.chats.push(singleChat)
                  const newChatroom = {...chatroom, lastChat: singleChat}
                  const newUserChatDetails = [...userChatDetails.filter(room => room.uid !== chatroom.uid), newChatroom]
                  setUserChatDetails(newUserChatDetails);
                  // send data to firebase
                  await updateSingleChatroom(singleChat,userChatDetails)
                  resetForm();
                } catch (err){
                  console.log(err)
              }
          }}
      >
        {({ values,
            setValues,
            handleSubmit,
            resetForm,
            touched,
            errors
            }) => (
              <>
            <View className="flex flex-row self-end mx-[2%]">
                <TextInput
                  name="message"
                  placeholder="Say hi"
                  placeholderTextColor="#858282"
                  autoCorrect={true}
                  style={[
                    styles.textInput,
                    GlobalStyles.CustomFont
                  ]}
                  onChangeText={(val) => setValues(val)}
                  autoFocus={true}
                  autoCapitalize="none"
                  multiline={true}
                  value ={values.message}
                />
                <Pressable style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#bcc3ff' : '#4759ff',
                      transform: [{scale: pressed ? 0.9 : 1}]
                    },
                    styles.panelButton
                  ]} onPress={handleSubmit}>
                      {({ pressed }) => (
                          <Text style={[styles.panelButtonTitle, 
                          {
                              color: pressed ? 'black' : 'white'
                          }]}>
                             Send
                          </Text>
                      )}
                  </Pressable>
          </View>
      </>)}
    </Formik>
  </KeyboardAwareScrollView>
)}

const styles = StyleSheet.create({
    textInput: {
      flex:1,
      width:'80%',
      paddingLeft: "3%",
      color: '#05375a',
      borderWidth:1,
      borderColor:"#05375a",
      borderRadius: 20,
      fontSize: 18,
      height: 50,
      borderColor:'blue',
      borderWidth:2,

    },
    panelButton: {
      width: '20%',
      marginLeft: '2%',
      borderRadius: 20,
      alignItems: 'center',
      alignSelf:'flex-end',
      height: 50,
      justifyContent:'center'
    },
    panelButtonTitle: {
      fontSize: 16,
      fontWeight: 'semi-bold',
      color: 'white',

    }
  
})