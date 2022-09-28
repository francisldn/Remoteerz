// @ts-nocheck
import { View, Text, ScrollView, Pressable } from 'react-native'
import React,{useEffect} from 'react'
import Footer from '../components/Footer';
import GlobalStyles from '../utils/GlobalStyles'
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import SettingList from '../components/SettingList'
import { TouchableRipple } from 'react-native-paper';
import { useAuth } from '../utils/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { chatService } from '../utils/chatService';

export default function Profile() {
  const {currentUserDetails, loading, getUserDetails, setCurrentUserDetails, currentUser} = useAuth()
  const {placeholderImages} = chatService();
  const profileImage = currentUserDetails?.image?.toString()|| placeholderImages[Math.round(Math.random())]
  const navigation = useNavigation()

  useEffect(() => {
    try {
        // getUserDetails(currentUser.uid).then((data) => setCurrentUserDetails(data))
        console.log('current user details',currentUserDetails)
    } catch(error) {
        console.log(error)
    }
  },[])
  
  if(!currentUserDetails || loading) return (
    <ScrollView style={{flex:1}} contentContainerStyle={{display:'flex',paddingTop:'50%'}}>
        <View>
            <LoadingSpinner size={"large"}/>
        </View>
    </ScrollView>
  )

  return (
    <>
        <ScrollView className="flex-1 ">
            <View className="flex self-center pt-[6%]">
                <Avatar imageURL={profileImage} size={200} update={false}/>
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
            <View className="flex flex-row justify-around w-full bg-white h-[60] items-center">
                <TouchableRipple 
                    className="w-[50%] border-r-[1rem] h-full justify-center border-r-[#b6b6b6]"
                    onPress={() => navigation.navigate('EditProfile')}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                   
                        <Text 
                            className="text-xl text-center"
                            style={GlobalStyles.CustomFont}
                        >
                            Edit Profile
                        </Text>
                </TouchableRipple>
                <TouchableRipple 
                    className="w-[50%] h-full justify-center"
                    onPress={() => navigation.navigate('PreviewProfile')}
                >
                     <Text 
                            className="text-xl text-center"
                            style={GlobalStyles.CustomFont}
                        >
                            Show Profile
                        </Text>
                </TouchableRipple>
            </View>

            {/* Account Setting */}
            <View>
                <Text className="text-2xl pt-[10%] pl-[4%]" style={GlobalStyles.CustomFont}>Account Settings</Text>
            </View>
            <SettingList iconName="person-outline" text="Personal information" nav={"AccountSettings"}/>
            
            {/* tech stacks - demo only */}
            <SettingList iconName="computer" text="Tech stacks (Demo only)" nav={"TechStacks"}/>
        </ScrollView>
        <Footer screen="Profile"/>
    </>
  )
}