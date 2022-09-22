// @ts-nocheck
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';

interface BottomIconProps {
    iconName:string;
    text:string;
    pressHandler:() => {};
}

export default function BottomIcon({iconName, text, pressHandler}:BottomIconProps) {

    const {colors} = useTheme();
  return (
    <View className="flex align-middle justify-center mx-auto w-40 h-60">
        <Pressable className="flex self-center justify-self-center pl-2" style={styles.Icon} onPress={pressHandler}>
        {({ pressed }) => 
            (<>
                <MaterialIcons name={iconName} 
                    color={pressed? 'lightgrey': 'orange'} 
                    size={40} 
                />
                <Text 
                    className="text-xs"
                    style={{
                        color: pressed ? 'lightgrey' : 'orange'
                    }}
                >{text}</Text>
            </>)}
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    Icon: {
        width: "100%",
        height: 40,
      },
})