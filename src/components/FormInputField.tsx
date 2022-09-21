import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
// use default Material design 3 theme
import {useTheme} from 'react-native-paper';

interface FormInputFieldProps {
  iconName: string;
  placeholderText: string;
  placeholderTextColor: string;
  autoCorrect: boolean;
}

const FormInputField = ({iconName, placeholderText, placeholderTextColor, autoCorrect}:FormInputFieldProps) => {
    const {colors} = useTheme();

    return (
        <View style={styles.action}>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-nocheck
          <FontAwesome name={iconName} color={colors.text} size={20} />
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
          />
        </View>
    );
}

const styles = StyleSheet.create({
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      },
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
      },
})

export default FormInputField;
