// @ts-nocheck
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Svg, Path} from 'react-native-svg'
import {moderateScale} from 'react-native-size-matters';
import {dateTimeFormat} from '../utils/time';
import GlobalStyles from '../utils/GlobalStyles';
import ChatBubbleSVGLeft from './ChatBubbleSVGLeft';
import ChatBubbleSVGRight from './ChatBubbleSVGRight';

const ChatBubble = ({chatMsg, userA, user, dateTime}) => {

    const leftOrRight = (userA, user) => {
        // left is true, right is false
        return userA === user ? true : false
    }

    return (
    <View style={leftOrRight(userA, user) ? [styles.item,styles.itemLeft] : [styles.item,styles.itemRight]}>
        <View style={[styles.balloon, {backgroundColor: leftOrRight(userA, user) ? 'grey' : '#36a411'}]}>
          <Text style={[GlobalStyles.CustomFont,styles.chatContent]}>{chatMsg}</Text>
          <Text style={[GlobalStyles.CustomFont,styles.chatDate]}>{dateTimeFormat(dateTime)}</Text>
          <View
            style={leftOrRight(userA, user) ? [styles.arrowLeftContainer]:[styles.arrowRightContainer]}
          >
           {leftOrRight(userA, user) 
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
        marginVertical: moderateScale(7, 2),
        flexDirection: 'row',
        marginLeft: '4%'
     },
     itemRight: {
        marginVertical: moderateScale(7, 2),
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
        paddingTop: 5, 
        color: 'white'
     },
     chatDate: {
        paddingTop: 3, 
        fontSize:8, 
        color:'white',
        alignSelf:'flex-end'
     }
})

export default ChatBubble;