// @ts-nocheck
import { View, Text, Alert  } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import Footer from '../components/Footer';
import GlobalStyles from '../utils/GlobalStyles'
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';
import { useAuth } from '../utils/useAuth';
import { SimpleLineIcons } from '@expo/vector-icons';
import ProfileFormInputField from '../components/ProfileFormInputField';
import { useFormik} from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonToggleGroup from 'react-native-button-toggle-group';
import AuthButton from '../components/AuthButton';
import ProfileFormInputLabel from '../components/ProfileFormInputLabel';
import ProfileInputRadioButton from '../components/ProfileInputRadioButton';
import ProfileInputAgePicker from '../components/ProfileInputAgePicker';
import { CapFirstCharacter } from '../utils/helperFunctions';
import BottomSheet, {BottomSheetView, useBottomSheetSpringConfigs} from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToFirestore } from '../utils/helperFunctions';

const placeholderImageURL = "https://firebasestorage.googleapis.com/v0/b/remoteers-360d0.appspot.com/o/icons8-selfies-100.png?alt=media&token=da1fef51-7ede-4f32-a559-1270ba1fe95f"

export default function EditProfile({route}) {
  const {currentUserDetails, loading, updateCurrentUserDetails, getCurrentUserDetails} = useAuth()
  const [userData, setUserData] = useState(currentUserDetails || route.params)
  const navigation = useNavigation()
  const [displayValue, setDisplayValue] = useState(CapFirstCharacter(userData.display_status) || 'Public' );
  const [genderValue, setGenderValue] = useState(CapFirstCharacter(userData.gender)|| 'Male');
  const [image, setImage] = useState(placeholderImageURL)
  const [isOpen, setIsOpen] = useState(false);

  // get user details
  useEffect(() => {
    if(!currentUserDetails) {
        try{
            getCurrentUserDetails().then(data => setUserData(data));
        } catch (error) {
            console.log(error)
        }
    }
  },[currentUserDetails])

  // snapPoints for bottomsheet
  const snapPoints = ['35%']

  const sheetRef = useRef(null)

  const animationConfigs = useBottomSheetSpringConfigs({
        overshootClamping: true,
    });

  const handleSnapPress = useCallback((index) => {
        if(sheetRef.current) sheetRef.current.snapToIndex(index);
        setIsOpen(true)
    },[])

  const accessCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access camera was denied');
            return;
        }
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0,
                allowsMultipleSelection: false,
            }).then(res => res.allowsMultipleSelection = false)
            
            if (!result.cancelled) {
                setImage(result.uri);
                setIsOpen(false)
                return
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error in launching camera. Please try again.')
        }

    }

  const accessAlbum = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access album was denied');
            return;
        }

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5,
                allowsMultipleSelection:false
            });
            if (!result.cancelled) {
                setImage(result.uri);
                const url = await uploadImageToFirestore(result.uri)
                console.log(url)
                const imageData = {image: url}
                await updateCurrentUserDetails(imageData)
                    .then(() => console.log('image successfully updated'))
                    .catch((error) => console.log(error))
                setIsOpen(false)
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error in accessing album. Please try again.')
        }

    };

  const closeBottomSheet = () => {
        setIsOpen(false)
    }


  const ProfileSchema = yup.object().shape({
    username: yup
        .string()
        .test('len', 'at least 4 characters', val => val.toString().length >= 4)
        .test('len', 'max 10 characters', val => val.toString().length <= 10)
        .required('Username is required')
        .default(userData.username || ''),
    about: yup
        .string()
        .max(500, "Max 500 characters allowed")
        .default(userData.about || '')
        .optional(),
    interests: yup
        .string()
        .max(100, "Max 100 characters allowed")
        .default(userData.interests || '')
        .optional(),
    display_status: yup
        .string()
        .required()
        .oneOf(['public', 'private'])
        .default(userData.display_status || 'Public'), //public (true), private (false)
    sexual_orientation:yup
        .string()
        .oneOf(['gay', 'straight','lesbian','bisexual','other'])
        .default(userData.sexual_orientation || '')
        .optional(), //gay, straight, lesbian, bisexual, asexual, curious, none of the above
    age: yup.number('Must be a number')
        .min(16, 'You are not old enough to use this app')
        .default(userData.age || 16)
        .optional(),
    gender: yup
        .string()
        .oneOf(['male','female','other'])
        .default(userData.gender|| 'male')
        .optional(), //male, female, prefer not to say
    job_title: yup
        .string()
        .default(userData.job_title || '')
        .optional(),
    skills: yup
        .string()
        .default(userData.skills || '')
        .optional(),
    countries_travelled: yup
        .string()
        .max(100, "Max 100 characters allowed")
        .default(userData.countries_travelled || '')
        .optional(),
    countries_lived: yup
        .string()
        .max(100, "Max 100 characters allowed")
        .default(userData.countries_lived || '')
        .optional(),
    favourite_cities: yup
        .string()
        .default(userData.favourite_cities || '')
        .optional()
})

  const {handleSubmit, handleBlur, errors, setValues, values, touched} = useFormik({
    initialValues: {
        username: userData.username || '',
        about: userData.about || '',
        interests: userData.interests || '',
        display_status: userData.display_status || 'public', //public (true), private (false)
        sexual_orientation: userData.sexual_orientation || 'straight', //gay, straight, lesbian, bisexual, asexual, curious, none of the above
        age: userData.age || '',
        gender: userData.gender|| 'male', //male, female, prefer not to say
        job_title: userData.job_title || '',
        skills: userData.skills || '',
        countries_travelled: userData.countries_travelled || '',
        countries_lived: userData.countries_lived || '',
        favourite_cities: userData.favourite_cities || '',

    },
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
        try {
            setUserData(values);
            await updateCurrentUserDetails(values);
            const data = await getCurrentUserDetails()
            setUserData(data)
        } catch(error) {
            Alert.alert("Changes are not saved. Please try again.")
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
            <TouchableRipple 
                className="flex self-center pt-[6%]"
                onPress={() => handleSnapPress(0)}
            >
                <Avatar imageURL={image} size={200}/>
            </TouchableRipple>
            {!loading && 
            (<View className="flex self-center pt-[2%] pb-[6%]">
                <Text 
                    className="text-center text-2xl text-[#141bab] font-bold"
                    style={GlobalStyles.CustomFont}
                >
                    {userData && userData.username}
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
                    onPress={() => navigation.navigate('PreviewProfile', userData)}
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
                    value = {userData.username  || values.username }
                    multiline = {false}
                    textContentType={"username"}
                />
                {touched.username && errors.username && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.username}</Text>}
                {/* About */}
                <ProfileFormInputLabel inputLabel='ABOUT ME'/>
                <ProfileFormInputField 
                    iconName = {""}
                    placeholderText = {"Say something fun..."}
                    placeholderTextColor = {"#666666"}
                    autoCorrect ={false}
                    secureTextEntry = {false}
                    onChangeText= {(val) => {
                        setValues(prev => {
                            return ({...prev, about: val})
                        })}}
                    onBlur = {() => handleBlur('about')}
                    autoCapitalize = {"none"}
                    value = { userData.about || values.about }
                    multiline = {true}
                    height={100}
                />
                {touched.about && errors.about && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.about}</Text>}

                {/* Age*/}
                <ProfileFormInputLabel inputLabel='AGE'/>
                <ProfileInputAgePicker setValues={setValues} defaultAge={userData.age}/>
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
                    value = { userData.interests || values.interests }
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
                        value={displayValue }
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
                        value={ genderValue}
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
                <ProfileInputRadioButton setValues={setValues} defaultValue={CapFirstCharacter(userData.sexual_orientation) || 'Straight'}/>
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
                    value = { userData.job_title  || values.job_title }
                    multiline = {true}
                    height={40}
                    textContentType={"jobTitle"}
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
                    value = {userData.skills || values.skills }
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
                    value = {userData.countries_travelled  || values.countries_travelled}
                    multiline = {true}
                    height={60}
                    textContentType={"countryName"}
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
                    value = { userData.countries_lived || values.countries_lived }
                    multiline = {true}
                    height={60}
                    textContentType={"countryName"}
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
                    value = {userData.favourite_cities || values.favourite_cities }
                    multiline = {true}
                    height={60}
                    textContentType={"addressCity"}
                />
                {touched.favourite_cities && errors.favourite_cities && <Text className="text-red-500 pl-[4%] pb-[2%]">{errors.favourite_cities}</Text>}
                
                
        </View>
    </KeyboardAwareScrollView>
    <Footer screen="Profile"/>
    {isOpen && (<BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                animateOnMount
                enablePanDownToClose={true}
                enableContentPanningGesture={true}
                onClose={() => setIsOpen(false)}
                handleStyle={{backgroundColor:"#444444", opacity:0.4}}
                backgroundStyle={{backgroundColor:"#8d8d8d", opacity:0.9}}
            >
                <BottomSheetView
                    style={{paddingTop:15}}
                    animationConfigs = {animationConfigs}
                >
                    <AuthButton btnText={"Take Photo"} btnAction={accessCamera}/>
                    <AuthButton btnText={"Choose from Library"} btnAction={accessAlbum}/>
                    <AuthButton btnText={"Cancel"} btnAction={closeBottomSheet}/>
                </BottomSheetView>
            </BottomSheet>)}
    </>
  )
}