// @ts-nocheck
import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User, // type for user
    sendPasswordResetEmail
} from 'firebase/auth';
import {db} from './firebase/firebaseConfig';
import {auth} from './firebase/firebaseConfig';
import { doc, setDoc} from 'firebase/firestore';

// interface AuthProps {
//     user:User,
//     signUp: () => {},
//     signIn: () => {},
//     logout: () => {},
//     forgotPassword: () => void,
//     error: string,
//     loading: boolean
// }

const AuthContext = createContext<AuthProps>({
    user:null,
    signUp: async () => {},
    login: async () => {},
    logout: async () => {},
    forgotPassword: async() => {},
    error: null,
    initialloading: true,
    loading:false,
})

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    // firebase user
    const [user, setUser] = useState(null) 
    const [error, setError] = useState('')

    useEffect(() => {
        // redirect user to login page if user is not signed up
        const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if(user) {
                        setUser(user)
                    } else {
                        setUser(null)
                    }
                 })
        setInitialLoading(false)
        return unsubscribe;
    }, [])
    
    // sign up with email and password
    const signUp = async (email, password) => {
        setLoading(true)
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            .then(userCredential => setUser(userCredential.user))
            console.log('user', user)
            await setDoc(doc(db, 'Users', user.uid),
            {
                uid: user.uid,
                email:user.email,
                avatar:null,
                username:null,
                display_status: null,
                relationship_status:null,
                gender_preference:null,
                sexual_orientation: null,
                dietary_preference: null,
                age:null,
                dob:null,
                gender: null,
                about: null,
                interests: null,
                job_title: null,
                skills: null,
                countries_travelled: null,
                countries_lived:null,
                last_destination: null,
                next_destination: null,
                phone_number:null,
                location: {
                    location_name: '',
                    latitude:'',
                    longitude:''
                },
                myEvents:[],
                myFriends:[],
                chatrooms:[],
            })
            .catch(error => {throw new Error(error)})
        } catch (error) {
            if(error.code.includes("email-already-in-use")) {
                setError('This email has been registered before.')
                throw new Error('This email has been registered before.')
            }
            setError(error)
            setLoading(false)
            throw new Error(error)
        }
        setLoading(false)
    }
    
    // sign in with email and password
    // use signInwithEmailandPassword function from firebase
    const login = async (email, password) => {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setUser(auth.currentUser)
        } catch (error) {
            console.log(error.code);
            if(error.code.includes("wrong-password")) {
                setError('Wrong password.')
                throw new Error('Wrong password.')
            }
            setError(error.code)
            setLoading(false)
            throw new Error(error.code)
        }
        setLoading(false);
    }

    //sign out 
    const logout = async() => {
        setLoading(true)
        try {
            await signOut(auth).then(() => {
                setUser(null)
            });
        } catch (error) {
            console.log('error logging out: ', error);
            setError(error.message)
            setLoading(false)
            throw new Error(error.message)
        }
        setLoading(false)
    }

    const forgotPassword = async (email) => {
        setLoading(true)
        try{
            await sendPasswordResetEmail(auth, email).then(
                console.log("email sent")
            )
        } catch (error) {
            console.log('error with resetting password:', error);
            setError(error.message)
            setLoading(false)
            throw new Error(error.message)
        }
        setLoading(false)
    }
    
    // more performant
    // similar to useEffect but only re-compute if one of the dependencies changes
    const memoedValue = useMemo(() => ({
        user, 
        signUp, 
        login, 
        loading,
        initialLoading,
        logout,
        error,
        forgotPassword,
    }), [user,initialLoading,loading,error])


    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
};