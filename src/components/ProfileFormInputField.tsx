/* tslint:disable comment-format */
// @ts-nocheck
import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import GlobalStyles from '../utils/GlobalStyles';
// use default Material design 3 theme
import {useTheme} from 'react-native-paper';

interface ProfileFormInputFieldProps {
    iconName: string;
    placeholderText: string;
    placeholderTextColor: string;
    autoCorrect: boolean;
    keyboardType?: string;
    textContentType?: string;
    clearTextOnFocus?: boolean;
    secureTextEntry?: boolean;
    onChangeText?: () => {};
    onBlur?: () => {};
    autoFocus?: boolean ;
    autoCapitalize?: string,
    value: string | number;
    multiline?: boolean;
    height?: number;
}


const ProfileFormInputField = ({
        iconName, 
        placeholderText, 
        placeholderTextColor, 
        autoCorrect, 
        keyboardType, 
        textContentType,
        clearTextOnFocus,
        secureTextEntry,
        onChangeText,
        onBlur,
        autoFocus,
        autoCapitalize,
        value,
        multiline,
        height
    }:ProfileFormInputFieldProps) => {
    const {colors} = useTheme();

    return (
        <>
        <View style={[styles.action,{
            height: height || 40,
        }]}>
            <View className="flex self-center justify-self-center pl-2">
                <MaterialIcons name={iconName} color={colors.text} size={20}/>
            </View>
            <TextInput
                placeholder={placeholderText}
                placeholderTextColor={placeholderTextColor}
                autoCorrect={autoCorrect}
                style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                ]}
                keyboardType={keyboardType}
                textContentType={textContentType}
                clearTextOnFocus={clearTextOnFocus}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                onBlur={onBlur}
                autoFocus={autoFocus}
                autoCapitalize={autoCapitalize}
                value ={value}
                multiline = {multiline}
                height={height}
            />
      </View>
      </>
    );
}

const styles = StyleSheet.create({
    action: {
        width: "100%",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        height: 40,
        backgroundColor:"#fff",
        borderColor:'#d4d0d0',
        borderRightColor:'transparent',
        borderLeftColor:'transparent'
      },
      textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 16,
      },
})

export default ProfileFormInputField;
