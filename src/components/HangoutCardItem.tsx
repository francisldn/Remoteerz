// @ts-nocheck
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import GlobalStyles from '../utils/GlobalStyles'
import { useNavigation } from '@react-navigation/native'

export default function HangoutCardItem({username, image}) {
    const navigation = useNavigation()

  return (
    <TouchableRipple 
        rippleColor="#fff"
        style={styles.imageItem}
        onPress={() => navigation.navigate('UserDetails')}
    >
        <ImageBackground source={{uri: image}} style={styles.imageBackground} resizeMode="cover">
            <Text className="text-lg text-white pt-[65%] pl-[10%]" style={GlobalStyles.CustomFont}>{username}</Text>
        </ImageBackground>
    </TouchableRipple>
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