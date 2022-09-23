// @ts-nocheck
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export default function ProfileInputAgePicker({setValues}){
  const [age, setAge] = useState('16')
  // to convert into string because Picker can only handle string
  const ageArray = [...Array(100).keys()].map(i=> (i+16).toString());

  return (
  <Picker
      style={styles.agePicker}
      selectedValue={age}
      onValueChange={(itemValue, itemIndex) => {
        setAge(itemValue)
        setValues(prev => {
          return ({...prev, age: itemValue})
        })
      }}>
      {ageArray.map((item,index) => (<Picker.Item key={index} label={item} value={item} />))}
  </Picker>
)}

const styles = StyleSheet.create({
  agePicker: {
    marginTop: '3%',
    marginBottom:'4%',
    backgroundColor:'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#c6c3c3',
    borderBottomColor: '#c6c3c3'
  }
})