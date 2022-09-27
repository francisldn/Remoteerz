import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

export default function TechStacks() {
  return (
    <ScrollView 
        className="mx-auto"
        indicatorStyle="white"
    >
        <View>
            <Image source={{uri: "https://3ulsmb4eg8vz37c0vz2si64j-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/react-native-UX-design.gif"}} style={{height:150, width:150, resizeMode:'contain'}}/>
        </View>
        <View className="p-0">
            <Image source={require('../../assets/expo.webp')} style={{height:120, width:120, resizeMode:'contain'}}/>
        </View>
        <View className="p-0">
            <Image source={require('../../assets/tailwind.png')} style={{height:120, width:120, resizeMode:'contain'}}/>
        </View>
        <View className="p-0">
            <Image source={require('../../assets/formik.png')} style={{height:120, width:120, resizeMode:'contain'}}/>
        </View>
        <View className="p-0">
            <Image source={require('../../assets/firebase.png')} style={{height:180, width:180, resizeMode:'contain'}}/>
        </View>
        <View className="p-0">
            <Image source={require('../../assets/typescript.png')} style={{height:100, width:100, resizeMode:'contain'}}/>
        </View>
        
    </ScrollView>
    
  )
}