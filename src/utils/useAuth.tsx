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
import { doc, getDoc, setDoc} from 'firebase/firestore';
import {useLocation} from './useLocation'    
// interface AuthProps {
//     user:User,
//     signUp: () => {},
//     signIn: () => {},
//     logout: () => {},
//     forgotPassword: () => void,
//     error: string,
//     loading: boolean
// }


export const updateUserDetails = async (userData, userId) => {
    if(userId) {
        const docRef = doc(db,"Users",userId)
        try {
            await setDoc(docRef, userData, {merge:true})
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    } else {
        console.log('user id undefined')
    }
}

export const getUserDetails = async (userId:string) => {
    const docRef = doc(db,"Users",userId)
    try {
        const userDetails = await getDoc(docRef)
        return userDetails.data();
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const AuthContext = createContext<AuthProps>({
    currentUser: null,
    signUp: async () => {},
    login: async () => {},
    logout: async () => {},
    forgotPassword: async() => {},
    loading: false,
    initialLoading:false,
    error: null,
    setLoading: ()=> {},
    currentUserDetails:null,
    updateUserDetails: ()=> {},
    setCurrentUserDetails: () => {},
    getUserDetails: () => {}
})

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(false)
    // firebase user
    const [currentUserDetails, setCurrentUserDetails] = useState(null)
    const [currentUser, setCurrentUser] = useState(null) 
    const [error, setError] = useState('')
    const {currentUserLocation, setCurrentUserLocation, locationLoading, setLocationLoading, getCurrentLocation} = useLocation()

    // get user auth when user signs up
    // then retrieve user location and update
    useEffect(() => {
        setInitialLoading(true);
        // redirect user to login page if user is not signed up
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user)
                const id = user.uid
                if(id) {
                    updateUserOnlineStatus()
                        .then(() => console.log('user online status updated'))   
                        .catch((error) => console.log('failed to update online status')) 
                    
                    getUserDetails(id)
                    .then(data => {
                        setCurrentUserDetails(data)
                        console.log('user details retrieved successfully')
                    })
                    .catch(error => console.log('failed to retrieve user details'))
                }
            } else {
                setCurrentUser(null)
            }
        })

        setInitialLoading(false)
        return unsubscribe;
    }, [])

    useEffect(() => {
        setLocationLoading(true)
        const id = currentUser?.uid;
        if(id) {
            getCurrentLocation().then(data => {
                console.log(data)
                setCurrentUserLocation(data)
                updateUserDetails(data, id)
                .then(() => console.log('user location updated'))
                .catch(error => console.log('failed to update user location'))
            })
        }
        setLocationLoading(false)
    },[currentUser]);

    // sign up with email and password
    const signUp = async (email, password) => {
        const username= email.split('@')[0]
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth,email,password)
            setCurrentUser(userCredential.user)
            await setDoc(doc(db, 'Users', userCredential.user.uid),
                {
                    uid: userCredential.user && userCredential.user.uid,
                    email: userCredential.user && userCredential.user.email,
                    image:null,
                    username: username,
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
                    myEvents:[],
                    myFriends:[],
                    chatrooms:[],
                })
            console.log('successfully add user to database')

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
            setCurrentUser(auth.currentUser)
        } catch (error) {
            if(error.code.includes("wrong-password")) {
                setError('Wrong password. Please try again.')
                throw new Error('Wrong password. Please try again.')
            } else if (error.code.includes("user-not-found")) {
                setError('Not registered. Please sign up and try again.')
                throw new Error('Not registered. Please sign up and try again.')
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
        const id = auth.currentUser.uid
        try {
            await signOut(auth).then(() => {
                setCurrentUser(null)
            });
            await updateUserOfflineStatus(id);
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
    
    
    const updateUserOnlineStatus = async () => {
        const id = auth.currentUser.uid
        if(id) {
            const docRef = doc(db,"Users",id)
            try {
                await setDoc(docRef, {online: true}, {merge:true})
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        } else {
            console.log('user id undefined')
        }
    }

    const updateUserOfflineStatus = async (id) => {
        if(id) {
            const docRef = doc(db,"Users",id)
            try {
                await setDoc(docRef, {online: false}, {merge:true})
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        } else {
            console.log('user id undefined')
        }
    }

    

    // more performant
    // similar to useEffect but only re-compute if one of the dependencies changes
    const memoedValue = useMemo(() => ({
        currentUser, 
        signUp, 
        login, 
        loading,
        initialLoading,
        logout,
        error,
        forgotPassword,
        setLoading,
        currentUserDetails,
        updateUserDetails,
        setCurrentUserDetails,
        getUserDetails,
    }), [currentUserDetails,initialLoading,loading,error])


    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
};