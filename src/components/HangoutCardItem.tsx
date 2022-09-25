// @ts-nocheck
import { TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import GlobalStyles from '../utils/GlobalStyles'
import { useNavigation } from '@react-navigation/native'

export default function HangoutCardItem({userDetails}) {
    const navigation = useNavigation()

  return (
    <TouchableOpacity 
        rippleColor="#fff"
        style={styles.imageItem}
        onPress={() => navigation.navigate('UserDetails',userDetails)}
    >
        <ImageBackground source={{uri: userDetails.image}} style={styles.imageBackground} resizeMode="cover">
            <Text className="text-lg text-white pt-[65%] pl-[10%]" style={GlobalStyles.CustomFont}>{userDetails.username}</Text>
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