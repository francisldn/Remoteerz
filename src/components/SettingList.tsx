/* tslint:disable comment-format */
// @ts-nocheck
import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import GlobalStyles from '../utils/GlobalStyles';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
// use default Material design 3 theme
import {useTheme} from 'react-native-paper';
import { TouchableRipple } from 'react-native-paper';

interface SettingListProps {
  iconName: string;
  text: string;
}


const SettingList = ({
      iconName, 
      text, 
    }:SettingListProps) => {
    const {colors} = useTheme();
    const navigation= useNavigation()
    return (
        <TouchableRipple 
            className="flex flex-row" 
            onPress={() =>navigation.navigate('AccountSettings')}
            rippleColor="rgba(0, 0, 0, .32)"
            borderless={true}
            style={styles.listContainer}
        >
            <View className="flex flex-row flex-1 justify-between">
                <View className="flex flex-row flex-3">
                    <View className="flex self-center justify-self-center pl-3">
                        <MaterialIcons name={iconName} color={colors.text} size={30}/>
                    </View>
                    <View className="flex self-center justify-self-center pl-5">
                        <Text  
                            style={[GlobalStyles.CustomFont]}
                            className="text-lg"
                        >
                        {text}
                        </Text>
                    </View>
                </View>
                <View className="pr-5 self-center">
                    <SimpleLineIcons name="arrow-right" size={20} color="black" />
                </View>
            </View>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderColor: 'transparent',
        borderBottomColor: "#cacaca",
        borderWidth: 1,
        height: 60,
        marginTop: "8%",
        backgroundColor: "#fff"
    }   
})

export default SettingList;
