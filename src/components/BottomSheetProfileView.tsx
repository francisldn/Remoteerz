// @ts-nocheck
import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import GlobalStyles from "../utils/GlobalStyles";
import { CapFirstCharacter } from "../utils/helperFunctions";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../utils/useAuth";
import { updateCurrentUserDetails, getCurrentUserDetails } from '../utils/useAuth';
import { useNavigation } from "@react-navigation/native";

export default function BottomSheetProfileView({userDetails, preview}) {
    const {currentUserDetails, setCurrentUserDetails} = useAuth();
    const navigation = useNavigation();

    const snapPoints = useMemo(() => ["20%", "50%", "90%"], []);

    const isFriend = (id:string) => {
        return currentUserDetails?.myFriends.includes(id) ? true : false;
    }

    const addToFriends = async (id:string) => {
        let newFriends = []
        if (isFriend(id)) {
            newFriends = currentUserDetails?.myFriends.filter(userId => userId !== id);
        } else {
            newFriends = [...currentUserDetails?.myFriends, id];
        }
        try {
            await updateCurrentUserDetails({...currentUserDetails, myFriends: newFriends}, currentUserDetails.uid)
            const data = await getCurrentUserDetails(currentUserDetails.uid)
            setCurrentUserDetails(data)
        } catch (error) {
            console.log(error)
        }
    }
    


    if(!userDetails) return

    return (
      <>
        {/* bottom sheet */}
        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetContainer}
          handleStyle={{backgroundColor:'#fff', opacity:0.4}}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <View className="flex flex-row justify-between">
                <View className="flex flex-row">
                    <Text className="text-white text-3xl pr-5" style={GlobalStyles.CustomFont}>{userDetails?.username}</Text>
                    <Text className="text-white text-3xl" style={GlobalStyles.CustomFont}>{userDetails?.age}</Text>
                </View>
                
                {!preview && 
                    (<View className="flex flex-row">
                        <TouchableOpacity onPress={() => addToFriends(userDetails.uid)}>
                            {isFriend(userDetails.uid) 
                                ? (<FontAwesome5 name="user-check" size={30} color="#22C55E" style={{paddingRight:'9%'}} />)
                                : (<Ionicons name="person-add" size={32} color="#b4bcff" style={{paddingRight:'9%'}}/>)
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('UserChat', userDetails)}>
                            <Ionicons name="md-chatbox-outline" size={32} color="#b4bcff" style={{paddingRight:'4%'}}/>
                        </TouchableOpacity>
                    </View>)}
            </View> 
            <View className="pt-4 pb-16">
                {userDetails?.online 
                ? (<Text className="text-green-500" style={GlobalStyles.CustomFont}>Online now</Text>)
                : (<Text className="text-white" style={GlobalStyles.CustomFont}>Offline</Text>)
                }
            </View>
            <View className="flex flex-row pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Interest</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.interests)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Gender</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.gender)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Sexual Orientation</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.sexual_orientation)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Job Title</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.job_title)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Skills</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.skills)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Countries Travelled</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.countries_travelled)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Countries Lived</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.countries_lived)}</Text>
                </View>
            </View>
            <View className="flex flex-row pt-5 pb-5 border-b-[0.3rem] border-opacity-10 border-b-[#aeaeae]">
                <View className="w-[40%]">
                    <Text className="text-gray-300 text-md" style={GlobalStyles.CustomFont}>Favourite Cities</Text>
                </View>
                <View>
                    <Text className="text-white text-md" style={GlobalStyles.CustomFont}>{CapFirstCharacter(userDetails?.favourite_cities)}</Text>
                </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </>
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