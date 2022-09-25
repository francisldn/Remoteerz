// @ts-nocheck
import { TouchableOpacity, Text, ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../utils/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { chatService } from '../utils/chatService';

export default function HangoutCardItem({userDetails}) {
    const {placeholderImages} = chatService()
    const navigation = useNavigation()
    const imageURL = userDetails?.image || placeholderImages[Math.round(Math.random())]

  return (
    <TouchableOpacity 
        rippleColor="#fff"
        style={styles.imageItem}
        onPress={() => navigation.navigate('UserDetails',userDetails)}
    >
        <ImageBackground source={{uri: imageURL}} style={styles.imageBackground} resizeMode="cover">
            <View className="bg-[#363131] self-start mt-[80%] bg-opacity-40">
                <Text className="text-md text-white" style={GlobalStyles.CustomFont}>{userDetails.username}</Text>
            </View>
        </ImageBackground>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    // need to contain image within View
        imageItem:{
            width: "25%",
            height: 100,
        },
        imageBackground: {
            width: '100%',
            height: "100%",
            borderWidth: 2,
            borderColor: '#fff',
        },
    })