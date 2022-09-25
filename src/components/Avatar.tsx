import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import GlobalStyles from '../utils/GlobalStyles'

interface AvatarProps {
    imageURL: string;
    size: number;
    update:boolean;
}

export default function Avatar({imageURL, size, update}:AvatarProps) {
  return (
    <View className="rounded-full border-[4rem] border-[#4539d2]">
        <View className="rounded-full overflow-hidden border-2 border-white" style={{width: size, height: size}}>
            <ImageBackground source={{uri: imageURL}} style={styles.featuredPhoto} resizeMode="cover">
                {update && (
                <View className="flex mx-auto my-auto" style={{shadowColor:"#000000", shadowOpacity:1, elevation:30, shadowRadius:8}}>
                    <Text style={GlobalStyles.CustomFont} className="text-xl text-bold text-[#fff]">Upload Image</Text>
                </View>)}
            </ImageBackground>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
// need to contain image within View
    featuredPhoto: {
        flex:1,
        width: undefined,
        height: undefined,
    },
})