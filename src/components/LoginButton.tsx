import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

interface LoginButtonProps {
    btnText: string;
    btnAction: () => void;
}

const LoginButton = ({btnText, btnAction}: LoginButtonProps) => {
    const pressHandler= () => {}
    return (
        <>
        <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? '#bcc3ff'
              : '#4759ff'
          },
          styles.panelButton
        ]} onPress={btnAction}>
            {({ pressed }) => (
                <Text style={[styles.panelButtonTitle, {color: pressed ? 'black' : 'white'}]}>
                    {btnText}
                </Text>
            )}
        </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    panelButton: {
        padding: 13,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 7,
        width: '85%',
        alignSelf:'center'
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
})

export default LoginButton;
