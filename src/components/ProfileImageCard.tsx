// @ts-nocheck
import { View, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

export default function ProfileImageCard({imageURL}) {
  return (
    <View style={styles.card}>
      <ImageBackground
                source={{
                uri: imageURL,
                }}
                style={styles.image}>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  card: {
    display: 'flex',
    width: '92%',
    height: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    justifySelf:'center',
    shadowColor:"#000",
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 20,
    marginTop:'3%',
  },
})