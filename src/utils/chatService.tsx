// @ts-nocheck
import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {db} from './firebase/firebaseConfig';
import {auth} from './firebase/firebaseConfig';
import { doc, getDoc, setDoc} from 'firebase/firestore';

// to get users' details based on location
export const getUsersDetails = async(query) => {
    // const docRef = doc(db,"Users",userId)
    // try {
    //     const userDetails = await getDoc(docRef)
    //     return userDetails.data();
    // } catch (error) {
    //     console.log(error)
    //     throw new Error(error)
    // }
}

// to get current Users' chatrooms list
export const getChatrooms = async (userId:string) => {

}

// to get chats based on chatroom id
export const getChats = async (chatRoomId: string) => {

}