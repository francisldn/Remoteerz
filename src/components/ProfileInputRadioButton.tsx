// @ts-nocheck
import { View, Text, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import GlobalStyles from '../utils/GlobalStyles';

export default function ProfileInputRadioButton({setValues, defaultValue}) {
    const [current, setCurrent] = useState(defaultValue)
    return (
        <View style={[styles.radioBtn]}>
            <RadioButtonGroup
                // containerStyle={{ marginBottom: "3%" }}
                selected={current}
                onSelected={(value) => {
                    setCurrent(value)
                    setValues(prev => {
                        return ({...prev, sexual_orientation: value.toLowerCase()})
                     })
                }}
                radioBackground="#4136e5"            
            >
                <RadioButtonItem 
                    value="Straight"
                    label={
                    <Text style={GlobalStyles.CustomFont} className="pl-[3%] py-[2%]">Straight</Text>} />
               
                <RadioButtonItem 
                    value="Gay" 
                    label={<Text style={GlobalStyles.CustomFont} className="pl-[3%] py-[2%]">Gay</Text>} />
            
                <RadioButtonItem 
                        value="Lesbian" 
                        label={<Text style={GlobalStyles.CustomFont} className="pl-[3%] py-[2%]">Lesbian</Text>} />

                <RadioButtonItem 
                        value="Bisexual" 
                        label={<Text style={GlobalStyles.CustomFont} className="pl-[3%] py-[2%]">Bisexual</Text>} />

                <RadioButtonItem 
                        value="Other" 
                        label={<Text style={GlobalStyles.CustomFont} className="pl-[3%] py-[2%]">Other</Text>} />            
            </RadioButtonGroup>
    </View>
  )
}

const styles = StyleSheet.create({
    radioBtn:{
        height: 180,
        backgroundColor:'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e3e3',
        justifyContent:'center',
        paddingLeft: '3%',
        borderTopWidth: 1,
        borderTopColor: '#e6e3e3',
        marginTop:"3%",
        marginBottom:'3%'
    }
})