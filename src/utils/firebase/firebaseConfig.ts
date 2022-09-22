// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// how to add env variables in react native app  - https://levelup.gitconnected.com/using-environment-variables-in-a-react-native-app-f2dd005d2457
import {
  RN_APP_APIKEY,
  RN_APP_AUTHDOMAIN,
  RN_APP_PROJECTID,
  RN_APP_STORAGEBUCKET,
  RN_APP_MESSAGINGSENDERID,
  RN_APP_APPID,
  RN_APP_MEASUREMENTID 
} from '@env';
// to put this in .env file
const firebaseConfig = {
  apiKey: RN_APP_APIKEY,
  authDomain: RN_APP_AUTHDOMAIN,
  projectId: RN_APP_PROJECTID,
  storageBucket: RN_APP_STORAGEBUCKET,
  messagingSenderId: RN_APP_MESSAGINGSENDERID,
  appId: RN_APP_APPID,
  measurementId: RN_APP_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore() // to store user, chat and photos
export const auth = getAuth();