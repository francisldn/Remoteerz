// @ts-nocheck
import { View, Text, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import React from 'react'
import FormInputField from './FormInputField';
import AuthButton from './AuthButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/useAuth';

export default function ForgotPasswordForm() {
  // const {forgotPassword} = useAuth()
  const navigation = useNavigation()
  
  const ForgotPasswordSchema = yup.object().shape({
      email: yup.string().email('Please enter valid email').required('Email address is required'),
    })
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="flex justify-center align-middle mx-[8%] mt-[60%]">
    <Formik
            initialValues={{email: ''}}
            validationSchema={ForgotPasswordSchema}
            onSubmit={async (values) => {
                try{
                    // await forgotPassword(values.email)
                    navigation.navigate('Profile');
                } catch (err){
                    Alert.alert("Error signing in, please try again.")
                    navigation.navigate('SignIn')
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
                <AuthButton btnText="Reset Password" btnAction={handleSubmit}/>
              </>)}
      </Formik>
    </View>
    </TouchableWithoutFeedback>
  )
}