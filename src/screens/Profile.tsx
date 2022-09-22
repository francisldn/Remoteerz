import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Footer from '../components/Footer';
import GlobalStyles from '../utils/GlobalStyles'
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import SettingList from '../components/SettingList'
import { TouchableRipple } from 'react-native-paper';

export default function Profile() {
  const navigation = useNavigation()
  return (
    <>
        <ScrollView className="flex-1 ">
            <View className="flex self-center py-[6%]">
                <Avatar imageURL={"https://randomuser.me/api/portraits/women/34.jpg"} size={200}/>
            </View>
            {/* Edit Profile and Show Profile */}
            <View className="flex flex-row justify-around w-full bg-white h-[60] items-center">
                <TouchableRipple 
                    className="w-[50%] border-slate-300 border-r-[1rem] h-full justify-center"
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
                    className="w-[50%] border-slate-300 border-r-[1rem] h-full justify-center"
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
            <View className="">
                <Text className="text-2xl pt-[10%] pl-[4%]" style={GlobalStyles.CustomFont}>Account Settings</Text>
            </View>
            <SettingList iconName="person-outline" text="Personal information"/>
        </ScrollView>
        <Footer screen="Profile"/>
    </>
  )
}