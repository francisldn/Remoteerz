// @ts-nocheck
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React from 'react';
import HangoutCardItem from './HangoutCardItem';
import { chatService } from '../utils/chatService';
import { useAuth } from '../utils/useAuth';
import LoadingSpinner from './LoadingSpinner';

// const mockData = [
//     {
//         uid: '1',
//         username: "Jamie",
//         image: placeholderImageURL,
//         about: 'I live in London',
//         myFriends:['2'],
//     },
//     {
//         uid: '2',
//         username: "Amy",
//         image: placeholderImageURL,
//         about: 'I live in London',
//         interest: 'movies, travelling, tennis, swimming',
//         sexual_orientation: 'straight',
//         age: '30',
//         gender:'female',
//         job_title: 'freelance web developer',
//         skills: 'CSS, HTML, Javascript',
//         countries_travelled: 'France, Germany, UK, Ireland, Spain, USA',
//         countries_lived: 'UK',
//         favourite_cities:'Barcelona',
//         online:true,
//         myFriends:['1'],
//     },
//     {
//         uid:'3',
//         username: "Rob",
//         image: placeholderImageURL,
//         about: 'I live in London',
//         interest: 'movies, travelling, tennis, swimming',
//         sexual_orientation: 'straight',
//         age: '30',
//         gender:'female',
//         job_title: 'freelance web developer',
//         skills: 'CSS, HTML, Javascript',
//         countries_travelled: 'France, Germany, UK, Ireland, Spain, USA',
//         countries_lived: 'UK',
//         favourite_cities:'Barcelona',
//         online:true,
//         myFriends:['1'],
//     },
//     {
//         uid:'4',
//         username: "Lisa",
//         image: placeholderImageURL,
//         about: 'I live in London',
//         interest: 'movies, travelling, tennis, swimming',
//         sexual_orientation: 'straight',
//         age: '30',
//         gender:'female',
//         job_title: 'freelance web developer',
//         skills: 'CSS, HTML, Javascript',
//         countries_travelled: 'France, Germany, UK, Ireland, Spain, USA',
//         countries_lived: 'UK',
//         favourite_cities:'Barcelona',
//         online:true,
//         myFriends:['3'],
//     },
//     {
//         uid:'5',
//         username: "Jack",
//         image: placeholderImageURL,
//         about: 'I live in London',
//         interest: 'movies, travelling, tennis, swimming',
//         sexual_orientation: 'straight',
//         age: '30',
//         gender:'female',
//         job_title: 'freelance web developer',
//         skills: 'CSS, HTML, Javascript',
//         countries_travelled: 'France, Germany, UK, Ireland, Spain, USA',
//         countries_lived: 'UK',
//         favourite_cities:'Barcelona',
//         online:true,
//         myFriends:['3'],  
//     },

// ]

export default function HangoutCardList() {
  const {chatUsers} = chatService();
  const {currentUserDetails} = useAuth()

  if( !chatUsers || !currentUserDetails) return (
    
    <ScrollView style={{flex:1}} contentContainerStyle={{display:'flex',paddingTop:'50%'}}>
        <View>
            <LoadingSpinner size={"large"}/>
        </View>
    </ScrollView>
    
  )
    

  return (
    <View className="flex-1 bg-slate-800 w-screen flex-wrap" style={styles.contentWrapper}>
      <FlatList  
            data={chatUsers} // need to change
            ListEmptyComponent={() => (<View style={styles.emptyList}><Text>NO USERS TO DISPLAY</Text></View>)}
            renderItem={({item, index}) => {
                return <HangoutCardItem key={index} userDetails={item}/>
            }}
            numColumns={4}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    contentWrapper: {
        alignSelf:'baseline',
        flexWrap: 'wrap'
    },
    emptyList: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        height:'100%',
        paddingTop:'20%'
    }
})