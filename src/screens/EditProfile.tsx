// @ts-nocheck
import { View, Text, Pressable } from 'react-native'
import React, {useState} from 'react'
import Footer from '../components/Footer';
import GlobalStyles from '../utils/GlobalStyles'
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';
import { useAuth } from '../utils/useAuth';
import { SimpleLineIcons } from '@expo/vector-icons';
import ProfileFormInputField from '../components/ProfileFormInputField';
import { Formik, useFormik} from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonToggleGroup from 'react-native-button-toggle-group';
import AuthButton from '../components/AuthButton';
import ProfileFormInputLabel from '../components/ProfileFormInputLabel';
import ProfileInputRadioButton from '../components/ProfileInputRadioButton';
import ProfileInputAgePicker from '../components/ProfileInputAgePicker';


export default function EditProfile() {
  const {currentUserDetails, loading} = useAuth()
  const navigation = useNavigation()
  const [displayValue, setDisplayValue] = useState("Public");
  const [genderValue, setGenderValue] = useState('Male')


  const ProfileSchema = yup.object().shape({
    username: yup
        .string()
        .test('len', 'at least 4 characters', val => val.toString().length >= 4)
        .test('len', 'max 10 characters', val => val.toString().length <= 10)
        .required('Username is required')
        .default(currentUserDetails?.username || ''),
    about: yup
        .string()
        .max(500, "Max 500 characters allowed")
        .default(currentUserDetails?.about || '')
        .optional(),
    interests: yup
        .string()
        .max(100, "Max 100 characters allowed")
        .default(currentUserDetails?.interests || '')
        .optional(),
    display_status: yup
        .string()
        .required()
        .oneOf(['public', 'private'])
        .default(currentUserDetails?.display_status || 'Public'), //public (true), private (false)
    sexual_orientation:yup
        .string()
        .oneOf(['gay', 'straight','lesbian','bisexual','other'])
        .default(currentUserDetails?.sexual_orientation || '')
        .optional(), //gay, straight, lesbian, bisexual, asexual, curious, none of the above
    age: yup.number('Must be a number')
        .min(16, 'You are not old enough to use this app')
        .default(currentUserDetails?.age || 16)
        .optional(),
    gender: yup
        .string()
        .oneOf(['male','female','other'])
        .default(currentUserDetails?.gender|| 'male')
        .optional(), //male, female, prefer not to say
    job_title: yup
        .string()
        .default(currentUserDetails?.job_title || '')
        .optional(),
    skills: yup
        .string()
        .default(currentUserDetails?.skills || '')
        .optional(),
    countries_travelled: yup
        .string()
        .max(100, "Max 100 characters allowed")
        .default(currentUserDetails?.countries_travelled || '')
        .optional(),
    countries_lived: yup
        .string()
        .max(100, "Max 100 characters allowed")
        .default(currentUserDetails?.countries_lived || '')
        .optional(),
    favourite_cities: yup
        .string()
        .default(currentUserDetails?.favourite_cities || '')
        .optional()
})

  const {handleSubmit, handleBlur, errors, setValues, values, handleChange, touched} = useFormik({
    initialValues: {
        username: currentUserDetails?.username || '',
        about: currentUserDetails?.about || '',
        interests: currentUserDetails?.interests || '',
        display_status: currentUserDetails?.display_status || 'public', //public (true), private (false)
        sexual_orientation: currentUserDetails?.sexual_orientation || 'straight', //gay, straight, lesbian, bisexual, asexual, curious, none of the above
        age: currentUserDetails?.age || '',
        gender: currentUserDetails?.gender|| 'male', //male, female, prefer not to say
        job_title: currentUserDetails?.job_title || '',
        skills: currentUserDetails?.skills || '',
        countries_travelled: currentUserDetails?.countries_travelled || '',
        countries_lived: currentUserDetails?.countries_lived || '',
        favourite_cities: currentUserDetails?.favourite_cities || '',

    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
        try {
            console.log(values)
            //submit the form
        } catch(error) {
            Alert.alert("Not saved.")
        }
    }
  })


  return (
    <>
     <KeyboardAwareScrollView
        extraScrollHeight={20}
        keyboardOpeningTime={200}
        >
        <View style={{flex:1, justifyContent:'flex-end', height:"100%"}}>
            <View className="flex self-center pt-[6%]">
                <Avatar imageURL={"https://randomuser.me/api/portraits/women/34.jpg"} size={200}/>
            </View>
            {!loading && 
            (<View className="flex self-center pt-[2%] pb-[6%]">
                <Text 
                    className="text-center text-2xl text-[#141bab] font-bold"
                    style={GlobalStyles.CustomFont}
                >
                    {currentUserDetails && currentUserDetails.username}
                </Text>
            </View>)}

           
            {/* Edit Profile and Show Profile */}
            <View className="flex flex-row justify-around w-full h-[60] items-center mb-[8%]">
                <TouchableRipple 
                    className="w-[50%] border-slate-300 border-r-[1rem] h-full justify-center bg-white"
                    onPress={() => handleSubmit(values)}
                >
                    <Text 
                        className="text-xl text-center "
                        style={GlobalStyles.CustomFont}
                    >
                        Save Profile
                    </Text>
                </TouchableRipple>
                <TouchableRipple 
                    className="w-[50%] border-slate-300 border-r-[1rem] h-full justify-center bg-white"
                    onPress={() => navigation.navigate('PreviewProfile')}
                >
                <View className="flex flex-row justify-between">
                    <Text 
                        className="text-xl text-center flex-1"
                        style={GlobalStyles.CustomFont}
                    >
                        Show Profile
                    </Text>
                    <View className="self-center pr-5">
                        <SimpleLineIcons name="arrow-right" size={20} color="black" />
                    </View>
                </View>
                </TouchableRipple>
            </View>
            
            
              {/* Username */}
                <ProfileFormInputLabel inputLabel='USERNAME'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"Username"}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, username: val})
                        })}}
                    onBlur = {() => handleBlur('username')}
                    autoCapitalize = {"none"}
                    value = { values.username || currentUserDetails?.username }
                    multiline = {false}
                />
                {touched.username && errors.username && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.username}</Text>}
                {/* About */}
                <ProfileFormInputLabel inputLabel='ABOUT ME'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"Say something fun."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, about: val})
                        })}}
                    onBlur = {() => handleBlur('about')}
                    autoCapitalize = {"none"}
                    value = { values.about || currentUserDetails?.about }
                    multiline = {true}
                    height={100}
                />
                {touched.about && errors.about && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.about}</Text>}

                {/* Age*/}
                <ProfileFormInputLabel inputLabel='AGE'/>
                <ProfileInputAgePicker setValues={setValues} />
                {errors.age && <Text className="text-red-500">{errors.age}</Text>}

                {/* Interests */}
                <ProfileFormInputLabel inputLabel='INTERESTS'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"Swimming, Reading, Travelling, Snowboarding, Festivals, Movies..."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, interests: val})
                        })}}
                    onBlur = {() => handleBlur('interests')}
                    autoCapitalize = {"none"}
                    value = { values.interests || currentUserDetails?.interests }
                    multiline = {true}
                    height={60}
                />
                {touched.interests && errors.interests && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.interests}</Text>}

                {/* Display profile status */}
                <ProfileFormInputLabel inputLabel='DISPLAY STATUS'/>
                <View style={{ marginTop: "3%", marginBottom:"3%" }}>
                    <ButtonToggleGroup
                        className="border-t-[1rem] border-b-[1rem] border-t-[#bcbaba] border-b-[#bcbaba]"
                        textStyle={[GlobalStyles.CustomFont]}
                        highlightBackgroundColor={'#4136e5'}
                        highlightTextColor={'white'}
                        inactiveBackgroundColor={'transparent'}
                        inactiveTextColor={'grey'}
                        values={['Public', 'Private']}
                        value={displayValue}
                        onSelect={val => {
                            setDisplayValue(val)
                            setValues(prev => {
                               return ({...prev, display_status: val.toLowerCase()})
                            })
                        }}
                    />
                </View>
                {errors.display_status && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.display_status}</Text>}

                {/* Gender */}
                <ProfileFormInputLabel inputLabel='GENDER'/>
                <View style={{  marginTop: "3%", marginBottom:"3%" }}>
                    <ButtonToggleGroup
                        className="border-t-[1rem] border-b-[1rem] border-t-[#bcbaba] border-b-[#bcbaba] "
                        textStyle={[GlobalStyles.CustomFont]}
                        highlightBackgroundColor={'#4136e5'}
                        highlightTextColor={'white'}
                        inactiveBackgroundColor={'transparent'}
                        inactiveTextColor={'grey'}
                        values={['Male', 'Female', 'Other']}
                        value={genderValue}
                        onSelect={val => {
                            setGenderValue(val)
                            setValues(prev => {
                               return ({...prev, gender: val.toLowerCase()})
                            })
                        }}
                    />
                </View>
                {errors.gender && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.gender}</Text>}

                {/* Sexual orientation */}
                <ProfileFormInputLabel inputLabel='SEXUAL ORIENTATION'/>
                <ProfileInputRadioButton setValues={setValues} />
                {errors.sexual_orientation && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.sexual_orientation}</Text>}
                
                {/* Job Title */}
                <ProfileFormInputLabel inputLabel='JOB TITLE'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"Frontend developer / iOS developer / Fullstack developer / Data scientist ..."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, job_title: val})
                        })}}
                    onBlur = {() => handleBlur('job_title')}
                    autoCapitalize = {"none"}
                    value = { values.job_title || currentUserDetails?.job_title }
                    multiline = {true}
                    height={40}
                />
                {touched.job_title && errors.job_title && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.job_title}</Text>}


                {/* Skills */}
                <ProfileFormInputLabel inputLabel='SKILLS'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"react, javascript, web frontend, mobile, typescript, java..."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, skills: val})
                        })}}
                    onBlur = {() => handleBlur('skills')}
                    autoCapitalize = {"none"}
                    value = { values.skills || currentUserDetails?.skills }
                    multiline = {true}
                    height={60}
                />
                {touched.skills && errors.skills && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.skills}</Text>}

                 {/* countries travelled */}
                <ProfileFormInputLabel inputLabel='COUNTRIES TRAVELLED'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"UK, Spain, Germany, France, China, USA..."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, countries_travelled: val})
                        })}}
                    onBlur = {() => handleBlur('countries_travelled')}
                    autoCapitalize = {"none"}
                    value = { values.countries_travelled || currentUserDetails?.countries_travelled }
                    multiline = {true}
                    height={60}
                />
                {touched.countries_travelled && errors.countries_travelled && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.countries_travelled}</Text>}
                
                {/* countries lived */}
                <ProfileFormInputLabel inputLabel='COUNTRIES LIVED'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"UK, USA, Canada, Germany..."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, countries_lived: val})
                        })}}
                    onBlur = {() => handleBlur('countries_travelled')}
                    autoCapitalize = {"none"}
                    value = { values.countries_lived || currentUserDetails?.countries_lived }
                    multiline = {true}
                    height={60}
                />
                {touched.countries_lived && errors.countries_lived && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.countries_lived}</Text>}
                
                {/* favourite city */}
                <ProfileFormInputLabel inputLabel='FAVOURITE CITIES'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"London, Barcelona, Berlin, Paris, New York..."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, favourite_cities: val})
                        })}}
                    onBlur = {() => handleBlur('favourite_cities')}
                    autoCapitalize = {"none"}
                    value = { values.favourite_cities || currentUserDetails?.favourite_cities }
                    multiline = {true}
                    height={60}
                />
                {touched.favourite_cities && errors.favourite_cities && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.favourite_cities}</Text>}
               
        </View>
    </KeyboardAwareScrollView>
    <Footer screen="Profile"/>
    </>
  )
}