// @ts-nocheck
import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { chatService } from '../utils/chatService'
import GlobalStyles from '../utils/GlobalStyles'

export default function ImageItem({userDetails}) {
    const {placeholderImages} = chatService()
    const imageURL = userDetails?.image || placeholderImages[Math.round(Math.random())]
  
    return (
      <ImageBackground source={{uri:imageURL}} className="w-20 h-20 mx-[1%] rounded-md overflow-hidden" resizeMode="cover">
            <View className="flex self-end mr-[5%]" style={{shadowColor:"#000000", shadowOpacity:1, elevation:30, shadowRadius:10}}>
                <Text style={[GlobalStyles.CustomFont,{textShadowColor:'#060606', textShadowRadius:5, textShadowOffset:{height:1, width:1}}]} className="text-xs text-[#fff]">{userDetails?.username}</Text>
            </View>
      </ImageBackground>
  )
}