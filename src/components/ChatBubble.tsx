// @ts-nocheck
import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Svg, Path} from 'react-native-svg'
import {moderateScale} from 'react-native-size-matters';
import {dateTimeFormat} from '../utils/time';
import GlobalStyles from '../utils/GlobalStyles';
import ChatBubbleSVGLeft from './ChatBubbleSVGLeft';
import ChatBubbleSVGRight from './ChatBubbleSVGRight';
import { useAuth } from '../utils/useAuth';

const ChatBubble = ({singleMsg}) => {
   const {uid, dateTime, message, chatroomId, user} = singleMsg;
   const {currentUserDetails} = useAuth();

    const leftOrRight = (currentUserDetails, user) => {
        // left is false (chat user), right is true (current user)
        return user.uid === currentUserDetails.uid ? true : false
    }

    const bubbleDirection = leftOrRight(currentUserDetails, user)

    return (
    <View style={bubbleDirection ? [styles.item,styles.itemLeft] : [styles.item,styles.itemRight]}>
        <View style={[styles.balloon, {backgroundColor: bubbleDirection ? 'grey' : '#36a411'}]}>
          <Text style={[GlobalStyles.CustomFont,styles.chatContent]}>{message}</Text>
          <Text style={[GlobalStyles.CustomFont,styles.chatDate]}>{dateTimeFormat(dateTime)}</Text>
          <View
            style={bubbleDirection? [styles.arrowLeftContainer]:[styles.arrowRightContainer]}
          >
           {bubbleDirection 
           ? (<ChatBubbleSVGLeft/>)
            : (<ChatBubbleSVGRight/>)}
        </View>
        </View>
      </View>

    );
}

// chat bubble styling modified from https://stackoverflow.com/questions/50465450/chat-bubble-in-react-native
const styles = StyleSheet.create({
    itemLeft: {
        paddingVertical: moderateScale(7, 2),
        flexDirection: 'row',
        marginLeft: '4%'
     },
     itemRight: {
        paddingVertical: moderateScale(7, 2),
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: '4%'
     },
     balloon: {
        maxWidth: moderateScale(250, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
     },
     arrowLeftContainer: {
        position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         zIndex: -1,
         flex: 1,
         justifyContent: 'flex-end',
         alignItems: 'flex-start'
     },
 
     arrowRightContainer: {
        position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         zIndex: -1,
         flex: 1,
         justifyContent: 'flex-end',
         alignItems: 'flex-end',
     },
     chatContent: {
        paddingTop: 3, 
        color: 'white'
     },
     chatDate: {
        paddingTop: 1, 
        fontSize:8, 
        color:'white',
        alignSelf:'flex-end'
     }
})

export default ChatBubble;
