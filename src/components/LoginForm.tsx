// @ts-nocheck
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import FormInputField from './FormInputField'
import AuthButton from './AuthButton'
import LoadingButton from './LoadingButton';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useAuth } from '../utils/useAuth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginForm() {
    const {login, loading, setLoading} = useAuth();
    // const signIn = () => {}
    const navigation = useNavigation()

    const LoginSchema = yup.object().shape({
      email: yup.string().email('Please enter valid email').required('Email address is required'),
      password: yup.string().min(6, `Invalid password`).required('Password is required')
  })

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      keyboardOpeningTime={20}
      keyboardShouldPersistTaps="handled"
    >
    <View
      className="flex justify-center align-middle mx-[8%] pt-[45%]"
      >
      {/* To dismiss keyboard if touch outside the input field */}
        <View>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
                try{
                    await login(values.email, values.password)
                    navigation.navigate('Profile');
                } catch (err){
                    Alert.alert(`${err.message}`)
                    navigation.navigate('Login')
                    setLoading(false)
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
                    textContentType={'emailAddress'}
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
                  textContentType={'password'}
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  autoFocus={false}
                  autoCapitalize={'none'}
                  value={values.password}
                />
                {touched.password && errors.password && <Text className="text-red-500">{errors.password}</Text>}
               {loading 
               ? <LoadingButton btnText="Login" />
               : (<AuthButton 
                  btnText="Login" 
                  btnAction={handleSubmit}
                />)}
              </>
              )}
            </Formik>
            
            <AuthButton 
              btnText="Sign Up" 
              btnAction={() => navigation.navigate('SignUp')}
            />
            
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="p-8 text-center font-bold text-blue-500">Forgot Password?</Text>
            </TouchableOpacity>

        </View>
    </View>
    </KeyboardAwareScrollView>
  )
}