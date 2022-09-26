// @ts-nocheck
import React,{useRef, useState} from 'react';
import {View, StyleSheet, Text, Animated, Alert, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {dateTimeFormat} from '../utils/time';
import { Swipeable } from 'react-native-gesture-handler';
import GlobalStyles from '../utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/useAuth';
import Avatar from './Avatar';
import { SimpleLineIcons } from '@expo/vector-icons';
import { deleteChatroom } from '../utils/chatService';
import { Chatroom, chatService } from '../utils/chatService';

const MessageBox = ({chatroom}:Chatroom) => {
    const {lastChat, users, chats} = chatroom;
    const {currentUserDetails, setCurrentUserDetails} = useAuth()
    const {chatUsers, setUserChatDetails, userChatDetails} = chatService()
    // function to determine chatUserId
    // arguments - users from chatroom (only 2 users), chatUsers include all users in Hangouts (containing more user details)
    const getChatUser = (users, chatUsers) => {
        if(!currentUserDetails || !chatUsers || !users) {
            console.log('chat user data not loaded')
            return
        }
        // get chat user id
        const chatUserId = users?.find(user => user?.uid !== currentUserDetails?.uid)
        // return chat user details object
        return chatUsers?.find(user => user.uid === chatUserId.uid)
    }

    const chatUserDetails = getChatUser(users, chatUsers);

    const {navigate} = useNavigation()
    // const deleteRef= useRef(null);
    // progress is not used but left it for better understanding of the arguments
    // const RenderRight = (progress, dragX) => {
    //     const scale = dragX.interpolate({
    //         // specify how much drag to apply
    //         inputRange: [-100, 0.1],
    //         // scale to apply
    //         outputRange: [1, 0.1],
    //         extrapolate: 'clamp'
    //     })

    //     const Style = {
    //         transform: [
    //             {
    //                 scale // cannot use other name than scale
    //             }
    //         ]
    //     }
    //     return (
    //         <Animated.View 
    //           style={styles.deleteContainer}
    //           onPress={deleteMsg}
    //           ref={deleteRef}
    //         >
    //             <Animated.Text style={[Style,{color: '#fff', fontWeight: '600'}]}>Delete</Animated.Text>
    //         </Animated.View>
    //     )
    // }

    const deleteMsg = () => {
        Alert.alert(
            "Delete Chatroom",
            "Confirm deleting the chatroom?",
            [
                {
                    text: 'Cancel',
                    onPress:() => {return},
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        const newChatArray = userChatDetails.filter(room => room.uid !== chatroom.uid)
                        setUserChatDetails(newChatArray)
                        const {newCurrentUserDetails} = await deleteChatroom(chatroom.uid,chatUserDetails,currentUserDetails)
                        setCurrentUserDetails(newCurrentUserDetails);
                        // deleteRef.current.setNativeProps({
                        //     height: 0,
                        //     width: 0,
                        //     opacity:0,
                        // })  
                        console.log('chatroom deleted')
                    },
                }
            ],

        )
    }


    return (
        // <Swipeable 
        //     renderRightActions={RenderRight}
        //     onSwipeableOpen={deleteMsg}
        // >
        <>
            {chatroom && (
                <Pressable
                className="flex flex-row w-full h-[100] border-[#222f9f] border-[0.3rem] bg-[#e5eeff] items-center"
                onPress={() => navigate('UserChat',{
                    chatroom: chatroom,
                    chatUserName: chatUserDetails?.username,
                    chatUserId: chatUserDetails?.uid
                })}
                onLongPress={deleteMsg}
            >
                
                    <View className="flex-1 items-center pl-[4%] pr-0 flex-row">
                        <View 
                            className="rounded-full self-start items-center content-center w-[50] h-[50]"
                        >
                            <Avatar imageURL={chatUserDetails?.image} size={52} update={false}/> 
                        </View>
                   
                        <View className="ml-[8%] justify-start self-start overflow-hidden w-[70%]">
                            <Text style={[GlobalStyles.CustomFont,styles.name]} className="text-[15] text-[#4b4a4a] font-semibold">{chatUserDetails?.username}</Text>
                            <Text style={[GlobalStyles.CustomFont,styles.text]} numberOfLines={1} ellipsizeMode="tail" className="text-[13] text-[#595959] overflow-hidden w-full pt-[3%]">{lastChat?.message}</Text>
                            <View className="self-start justify-start pt-[3%]">
                                {!!lastChat?.message && (<Text style={[GlobalStyles.CustomFont,styles.date]} className="text-[12rem] text-[#595959]">{dateTimeFormat(Number(lastChat?.datetime))}</Text>)}
                            </View>
                        </View>
                        
                        <SimpleLineIcons name="arrow-right" size={25} color="#949393" />

                    </View>

            </Pressable>)}
        </>
        // </Swipeable>
    );
}

const styles = StyleSheet.create({

    deleteContainer: {
        flex:1,
        height:80,
        backgroundColor:'red', 
        alignSelf:'flex-end',
        alignItems:'flex-end', 
        justifyContent:'center',
        borderColor: '#fff',
        borderWidth:0.5,
    }
})

export default MessageBox;
