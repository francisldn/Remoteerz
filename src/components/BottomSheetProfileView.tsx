// @ts-nocheck
import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useAuth } from "../utils/useAuth";
import GlobalStyles from "../utils/GlobalStyles";
import { CapFirstCharacter } from "../utils/helperFunctions";

export default function BottomSheetProfileView({userData, setUserData}) {
    const {currentUserDetails, loading, getCurrentUserDetails} = useAuth()
    const snapPoints = useMemo(() => ["20%", "50%", "90%"], []);

    useEffect(() => {
        try{
            getCurrentUserDetails().then(data => setUserData(data));
        } catch (error) {
            console.log(error)
        }
    },[currentUserDetails])

    
    if(loading && !currentUserDetails) return

    return (
      <View style={styles.container}>
        {/* photo card */}
        <View style={styles.card}>
            <ImageBackground
                source={{
                uri: "https://randomuser.me/api/portraits/women/34.jpg",
                }}
                style={styles.image}>
            </ImageBackground>
        </View>
        {/* bottom sheet */}
        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetContainer}
          handleStyle={{backgroundColor:'#fff', opacity:0.4}}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <View className="flex flex-row">
                <Text className="text-white text-3xl pr-5" style={GlobalStyles.CustomFont}>{userData.username}</Text>
                <Text className="text-white text-3xl" style={GlobalStyles.CustomFont}>{userData.age}</Text>
            </View> 
            <View className="pt-4 pb-16">
                {userData.online 
                ? (<Text className="text-green-500" style={GlobalStyles.CustomFont}>Online now</Text>)
                : (<Text className="text-white" style={GlobalStyles.CustomFont}>Offline</Text>)
                }
            </View>
            <View className="flex flex-row pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Interest</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.interests)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Gender</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.gender)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Sexual Orientation</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.sexual_orientation)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Job Title</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.job_title)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Skills</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.skills)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Countries Travelled</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.countries_travelled)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Countries Lived</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.countries_lived)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Favourite Cities</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userData.favourite_cities)}</Text>
                </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#c3d5fe"
    },
    bottomSheetContainer:{
        backgroundColor:"#000",
        opacity: 0.8,
        shadowColor: "#fcfcfc",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 20,
    },
    contentContainer: {
      flex:1,
      paddingHorizontal:'4%',
      paddingTop: '4%'
    },
    itemContainer: {
      padding: 6,
      margin: 6,
      backgroundColor: "#eee",
    },
    card: {
        display: 'flex',
        width: '95%',
        height: '95%',
        borderRadius: 10,
        alignSelf: 'center',
        justifySelf:'center',
        shadowColor:"#000",
        shadowOffset: {
        width: 20,
        height: 20,
        },
        shadowOpacity: 0.7,
        shadowRadius: 20,
        elevation: 20,
        marginTop:'3%',
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',
      },
      cardInner: {
        padding: 10,
      },
      name: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
      },
      bio: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
      },
  });