import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react';
import HangoutCardItem from './HangoutCardItem';

const placeholderImageURL = "https://firebasestorage.googleapis.com/v0/b/remoteers-360d0.appspot.com/o/icons8-selfies-100.png?alt=media&token=da1fef51-7ede-4f32-a559-1270ba1fe95f"

const mockData = [
    {
        username: "Jamie",
        image: placeholderImageURL
    },
    {
        username: "Amy",
        image: placeholderImageURL
    },
    {
        username: "Rob",
        image: placeholderImageURL
    },
    {
        username: "Lisa",
        image: placeholderImageURL
    },
    {
        username: "Jack",
        image: placeholderImageURL
    }
]

export default function HangoutCardList() {
  return (
    <View className="flex-1 bg-slate-800 w-screen flex-wrap" style={styles.contentWrapper}>
      <FlatList  
            data={mockData} // need to change
            ListEmptyComponent={() => (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center',height:'100%',paddingTop:'20%'}}><Text>NO USERS TO DISPLAY</Text></View>)}
            renderItem={({item, index}) => <HangoutCardItem key={index} username={item.username} image={item.image}/>}
            numColumns={4}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    contentWrapper: {
        alignSelf:'baseline',
        flexWrap: 'wrap'
    }
})