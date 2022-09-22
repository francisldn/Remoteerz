// @ts-nocheck
import { View, Text, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react'
import FormInputField from './FormInputField';
import AuthButton from './AuthButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/useAuth';

export default function SignUpForm() {
  const {signUp} = useAuth() 

   const SignUpSchema = yup.object().shape({
      username: yup.string().matches(/^[a-zA-Z0-9]{4,10}$/,{excludeEmptyString:true, message:"Username must be between 4-10 characters and contains no special characters"}).required('Username is required'),
      email: yup.string().email('Please enter valid email').required('Email address is required'),
      password: yup.string().min(6, ({min}) => `Password must be at least ${min} characters`).required('Password is required'),
      confirmPassword: yup.string().when("password",
      {is: (val:string) => (val && val.length>0 ? true : false), 
      then: yup.string().oneOf([yup.ref('password')], "Passwords must be the same")})
    })

    const navigation = useNavigation()

  return (
    <ScrollView>
      <View className="flex justify-center align-middle mx-[8%] pt-[40%]">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Formik
            initialValues={{username:'', email: '', password:'', confirmPassword: ''}}
            validationSchema={SignUpSchema}
            onSubmit={async (values) => {
                try{
                    await signUp(values.username, values.email, values.password)
                    navigation.navigate('Profile');
                } catch (err){
                    Alert.alert("Error signing in, please try again.")
                    navigation.navigate('Login')
                }
            }}
        >
         {({ values,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors
            }) => (
              <>
                <FormInputField 
                  iconName="person-outline" 
                  placeholderText="Username" 
                  placeholderTextColor="#666666" 
                  autoCorrect={false} 
                  textContentType={'username'}
                  clearTextOnFocus={true}
                  secureTextEntry={false}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  autoFocus={false}
                  autoCapitalize={'none'}
                  value={values.username}
                />
                {touched.username && errors.username && <Text className="text-red-500">{errors.username}</Text>}
                <FormInputField 
                  iconName="email" 
                  placeholderText="email@example.com" 
                  placeholderTextColor="#666666" 
                  autoCorrect={false} 
                  keyboardType={'email-address'}
                  clearTextOnFocus={true}
                  secureTextEntry={false}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoFocus={false}
                  autoCapitalize={'none'}
                  value={values.email}
                />
                {touched.email && errors.email && <Text className="text-red-500">{errors.email}</Text>}
                <FormInputField 
                  iconName="lock-outline" 
                  placeholderText="Password" 
                  placeholderTextColor="#666666" 
                  autoCorrect={false} 
                  textContentType={'newPassword'} 
                  clearTextOnFocus={true}
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  autoFocus={false}
                  autoCapitalize={'none'}
                  value={values.password}
                />
                {touched.password && errors.password && <Text className="text-red-500">{errors.password}</Text>}
                <FormInputField 
                  iconName="lock-outline" 
                  placeholderText="Confirm Password" 
                  placeholderTextColor="#666666" 
                  autoCorrect={false} 
                  textContentType={'password'}
                  clearTextOnFocus={true}
                  secureTextEntry={true}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  autoFocus={false}
                  autoCapitalize={'none'}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && <Text className="text-red-500">{errors.confirmPassword}</Text>}
                <AuthButton btnText="Sign Up" btnAction={handleSubmit}/>
              </>)}
        </Formik>
        </View>
      </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  )
}