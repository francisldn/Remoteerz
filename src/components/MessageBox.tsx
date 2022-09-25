// @ts-nocheck
import React,{useRef} from 'react';
import {View, StyleSheet, Text, Animated, Alert, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {dateTimeFormat} from '../utils/time';
import { Swipeable } from 'react-native-gesture-handler';
import GlobalStyles from '../utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const MessageBox = ({avatar, name, msg, datetime}) => {
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
                style={[styles.boxContainer]} 
                onPress={() => navigation.navigate('UserChat')}
            >
                <View style={styles.touchContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.imgContainer}>
                            <Ionicons name="person" size={24} color="#484646"/>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[GlobalStyles.CustomFont,styles.name]}>{name}</Text>
                            <Text style={[GlobalStyles.CustomFont,styles.text]} numberOfLines={1} ellipsizeMode="tail">{msg}</Text>
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={[GlobalStyles.CustomFont,styles.date]}>{dateTimeFormat(Number(datetime))}</Text>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    touchContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    boxContainer: {
        display: 'flex', 
        flexDirection: 'row',
        width: '100%',
        height: 80,
        borderColor: 'grey',
        borderWidth: 0.4,
        backgroundColor: '#fff',
    },
    imgContainer: {
        borderRadius: '100%',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        width:50,
        height: 50,
        backgroundColor: 'lightgrey',
    },
    leftContainer: {
        flex: 1,
        paddingTop: '3%',
        alignItems: 'center',
        paddingLeft: '2%',
        flexDirection: 'row',
    },
    textContainer: {
        marginLeft: '8%',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        overflow: 'hidden',
        width: '70%',
    },
    name: {
        fontSize: 15,
        paddingBottom: 3,
        color: '#292929'
    },
    text:{
        fontSize: 13,
        color: '#595959',
        overflow: 'hidden',
        width: '100%',
    },
    dateContainer: {
        paddingTop: '3%',
        alignItems: 'center',
        paddingRight: '3%',
    },
    date: {
        fontSize: 10,
        color: '#595959',
    },
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
