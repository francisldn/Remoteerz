// @ts-nocheck
import { View, Text } from 'react-native'
import React from 'react'
import GlobalStyles from '../utils/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

interface DashboardLabelProps {
    sectionLabel:string;
}

export default function DashboardLabel({sectionLabel, iconName}:DashboardLabelProps) {
  return (
    <View className="bg-[#d1d0d0] py-1 pl-2 w-full flex flex-row border-t-blue-500 border-b-blue-500 mt-[5%]">
        <View className="pr-[2%]">
            <Ionicons name={iconName} size={24} color="#00087a"/>
        </View>
        <View>
            <Text style={[GlobalStyles.CustomFont]} className="font-bold text-xl text-[#00087a]">{sectionLabel}</Text>
        </View>
    </View>
  )
}