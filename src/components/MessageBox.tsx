// @ts-nocheck
import React,{useRef} from 'react';
import {View, StyleSheet, Text, Animated, Alert, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {dateTimeFormat} from '../utils/time';
import { Swipeable } from 'react-native-gesture-handler';
import GlobalStyles from '../utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/useAuth';
import Avatar from './Avatar';

const MessageBox = ({chatroom}) => {
    const {uid, lastChat, users} = chatroom;
    const {currentUserDetails} = useAuth()
    // function to determine chatUserId
    const getChatUser = (users) => {
        if(!currentUserDetails) {
            console.log('current user not loaded')
            return
        }
        // return user object
        return users.find(user => user.uid !== currentUserDetails.uid)
    }

    const chatUser = getChatUser(users);

    const navigation = useNavigation()
    const deleteRef= useRef(null);
    // progress is not used but left it for better understanding of the arguments
    const RenderRight = (progress, dragX) => {
        const scale = dragX.interpolate({
            // specify how much drag to apply
            inputRange: [-100, 0.1],
            // scale to apply
            outputRange: [1, 0.1],
            extrapolate: 'clamp'
        })

        const Style = {
            transform: [
                {
                    scale // cannot use other name than scale
                }
            ]
        }
        return (
            <Animated.View 
              style={styles.deleteContainer}
              onPress={deleteMsg}
              ref={deleteRef}
            >
                <Animated.Text style={[Style,{color: '#fff', fontWeight: '600'}]}>Delete</Animated.Text>
            </Animated.View>
        )
    }

    const deleteMsg = () => {
        Alert.alert('Chats deleted');
        // more logic here to remove the text from database
        deleteRef.current.setNativeProps({
            height: 0,
        })  
    }

    return (
        <Swipeable 
            renderRightActions={RenderRight}
            onSwipeableOpen={deleteMsg}
        >
            <View
                ref={deleteRef}
                className="flex flex-row w-full h-[100] border-[#222f9f] border-[0.3rem] bg-[#e5eeff] items-center"
                onPress={() => navigation.navigate('UserChat')}
            >
                
                    <View className="flex-1 items-center pl-[4%] flex-row">
                        <View className="rounded-full self-start items-center content-center w-[50] h-[50]">
                            <Avatar imageURL={chatUser.image} size={52} update={false} /> 
                        </View>
                   
                        <View className="ml-[8%] justify-start self-start overflow-hidden w-[70%]">
                            <Text style={[GlobalStyles.CustomFont,styles.name]} className="text-[15] text-[#4b4a4a] font-semibold">{chatUser.username}</Text>
                            <Text style={[GlobalStyles.CustomFont,styles.text]} numberOfLines={1} ellipsizeMode="tail" className="text-[13] text-[#595959] overflow-hidden w-full pt-[3%]">{lastChat.message}</Text>
                        </View>
                    </View>
                    <View className="self-start pt-[6%] pr-[3%]">
                        <Text style={[GlobalStyles.CustomFont,styles.date]} className="text-[12rem] text-[#595959]">{dateTimeFormat(Number(lastChat.datetime))}</Text>
                    </View>
            
            </View>
        </Swipeable>
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
