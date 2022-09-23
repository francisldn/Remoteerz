// @ts-nocheck
import React from 'react';
import {Text, ImageBackground, View, StyleSheet} from 'react-native';

export default LargeAvatar = () => {
//   const {name, image, bio} = props.user;
  return (
    
    <View style={styles.card}>
        <ImageBackground
            source={{
            uri: "https://randomuser.me/api/portraits/women/34.jpg",
            }}
            style={styles.image}>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        width: '95%',
        height: '95%',
        borderRadius: 10,
        alignSelf: 'center',
        justifySelf:'center',
        shadowColor:"#000",
        shadowOffset: {
        width: 20,
        height: 20,
        },
        shadowOpacity: 0.7,
        shadowRadius: 20,
        elevation: 20,
        marginTop:'3%',
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',
      },
  
});
