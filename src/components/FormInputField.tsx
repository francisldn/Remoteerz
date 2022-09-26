/* tslint:disable comment-format */
// @ts-nocheck
import React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
// use default Material design 3 theme
import {useTheme} from 'react-native-paper';

interface FormInputFieldProps {
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
}


const FormInputField = ({
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
      value
    }:FormInputFieldProps) => {
    const {colors} = useTheme();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <View style={styles.action}>
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
          />
        </View>
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
      },
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
      },
})

export default FormInputField;
