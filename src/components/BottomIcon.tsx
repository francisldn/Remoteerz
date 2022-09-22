// @ts-nocheck
import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons';
interface BottomIconProps {
    iconName:string;
    text:string;
    pressHandler:() => {};
    textMarginLeft?: number;
    iconMarginLeft?: number;
    iconColor?: boolean
}

export default function BottomIcon({iconName, text, textMarginLeft, pressHandler,iconMarginLeft, iconColor}:BottomIconProps) {

  return (
    <View className="py-[3%]">
        <Pressable 
            onPress={pressHandler}
            >

                <View className="flex self-start pl-1" style={{paddingLeft:iconMarginLeft}}>
                    <MaterialIcons name={iconName} 
                            color={iconColor? '#4136e5': 'darkgrey'} 
                            size={40} 
                        />
                </View>
                <View style={{paddingLeft: textMarginLeft}}>
                    <Text 
                        className="text-[11rem]"
                        style={{
                            color: iconColor ? '#4136e5' : '#393939',
                        }}
                    >{text}</Text>
                </View>
                
        </Pressable>
    </View>
  )
}

