// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDFTZgXlnu0MEXAvtLMNpJL0NR1H5gxoJc",
  authDomain: "remoteers-360d0.firebaseapp.com",
  projectId: "remoteers-360d0",
  storageBucket: "remoteers-360d0.appspot.com",
  messagingSenderId: "228557775764",
  appId: "1:228557775764:web:217e6dcd09cebe1d1ee581",
  measurementId: "G-KGS6EZG8NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore() // to store user, chat and photos
export const auth = getAuth();