import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

interface LoadingButtonProps {
    btnText: string;
}

const LoadingButton = ({btnText}: LoadingButtonProps) => {
    return (
        <View className="w-full">
            <View style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>
                    {btnText}
                </Text>
            </View>
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
        alignSelf:'center',
        backgroundColor: 'lightgrey'
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
      },
})

export default LoadingButton;
