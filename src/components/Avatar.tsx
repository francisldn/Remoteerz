import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

interface AvatarProps {
    imageURL: string;
    size: number;
}

export default function Avatar({imageURL, size}:AvatarProps) {
  return (
    <View className="rounded-full overflow-hidden" style={{width: size, height: size}}>
        <Image source={{uri: imageURL}} style={styles.featuredPhoto} resizeMode="cover"/>
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