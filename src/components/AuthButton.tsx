import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

interface AuthButtonProps {
    btnText: string;
    btnAction: () => {};
}

const AuthButton = ({btnText, btnAction}: AuthButtonProps) => {
    const pressHandler= () => {}
    return (
        <View className="w-full">
        <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#bcc3ff' : '#4759ff',
            transform: [{scale: pressed ? 0.9 : 1}]
          },
          styles.panelButton
        ]} onPress={btnAction}>
            {({ pressed }) => (
                <Text style={[styles.panelButtonTitle, 
                {
                    color: pressed ? 'black' : 'white'
                }]}>
                    {btnText}
                </Text>
            )}
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    panelButton: {
        width: "100%",
        padding: 13,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 7,
        alignSelf:'center'
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
})

export default AuthButton;
