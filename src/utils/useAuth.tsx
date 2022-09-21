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
// import {db} from './firebase/firebaseConfig';
import {auth} from './firebase/firebaseConfig';
// import { doc, setDoc} from 'firebase/firestore';

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
    signIn: async () => {},
    logout: async () => {},
    forgotPassword: async() => {},
    error: null,
    loading: false
})

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    // const [initialLoading, setInitialLoading] = useState(true)
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
        setLoading(false)
        return unsubscribe;
    }, [])
    
    // sign up with email and password
    const signUp = async (username, email, password) => {
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            .then(userCredential => setUser(userCredential.user))
            console.log('user', user)

            // await setDoc(doc(db, 'Users', user.uid),
            // {
            //     id: user.uid,
            //     email:user.email,
            //     lat: 41.390205 + Number(Math.round(Math.random()) ? Math.random()*1.2 : Math.random()* (-1.2)),
            //     long: 2.154007 + Number(Math.round(Math.random()) ? Math.random()*1.2 : Math.random()* (-1.2)),
            //     myEvents:[],
            //     myFriends:[],
            //     myGroups:[],
            // })
        } catch (error) {
            console.log('error signing up:', error);
            setError(error.message)
            throw new Error(error.message)
        }
        setLoading(false)
    }
    
    // sign in with email and password
    // use signInwithEmailandPassword function from firebase
    const signIn = async (email, password) => {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setUser(auth.currentUser)
        } catch (error) {
            console.log('Error signing in', error);
            setError(error.message)
            throw new Error(error.message)
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
            throw new Error(error.message)
        }
        setLoading(false)
    }

    const forgotPassword = async (email) => {
        try{
            await sendPasswordResetEmail(auth, email).then(
                console.log("email sent")
            )
        } catch (error) {
            console.log('error with resetting password:', error);
            setError(error.message)
            throw new Error(error.message)
        }
        
    }
    
    // more performant
    // similar to useEffect but only re-compute if one of the dependencies changes
    const memoedValue = useMemo(() => ({
        user, 
        signUp, 
        signIn, 
        loading, 
        logout,
        error,
        forgotPassword
    }), [user, loading, error])


    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
};