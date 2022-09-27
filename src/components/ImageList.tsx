// @ts-nocheck
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import ImageItem from './ImageItem';
import DashboardLabel from './DashboardLabel';

export default function ImageList({filterList, sectionLabel, iconName}) {
        
    
      return (
    
        <View>
            <DashboardLabel sectionLabel={sectionLabel} iconName={iconName}/>
            <View className="h-50 bg-[#ffffff] w-full py-[3%]" style={styles.contentWrapper}>
                <ScrollView  
                    contentContainerStyle={{display:'flex', flexDirection:'row', width:'100%'}}
                    horizontal={true}
                >
                    {filterList.map((user, index) => (
                        <ImageItem key={index} userDetails={user}/>
                    ))}
                </ScrollView>
            </View>
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
    }
})