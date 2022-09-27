// @ts-nocheck
import React,{ createContext, useContext, useEffect, useMemo, useState } from 'react'
import {db} from './firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { updateUserDetails, getUserDetails, useAuth } from './useAuth';
import { getDistance, sortUsersByDistance } from './helperFunctions';
export interface SingleChat {
    uid:string,
    dateTime: number,
    chatroomId: string,
    message:string,
    status: false, // read = true or unread = false
    user: {
        uid: string,
        username: string
    }
}

export interface Chatroom {
    chats: SingleChat[],
    lastChat: singleChat,
    users: ChatUser[],
    uid: string
}
export interface ChatUser {
    image: string,
    uid: string,
    username: string
}

export interface ChatProps {
    chatrooms:Chatroom[],
    setChatrooms: () => {},
    loadingChats: boolean
}

export interface UserChatroom {
    chatroomId: string,
    userId: string
}

/*
****************** setting up chat functions to call ************************

*/
// to get users' details based on location
export const getChatUsersDetails = async (currentUserCity:string, currentUserLatitude:number, currentUserLongitude:number, currentUserId:string) => {
    if(!currentUserCity) {
        console.log('Location service disabled.')
        throw new Error('Location service disabled. Please enable location service to find other users.')
    }
    const q = query(collection(db, 'Users'), where("city","==", "Barcelona"));

    const usersArray=[]
    try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            usersArray.push({
                uid: doc.data().uid,
                username: doc.data().username,
                age: doc.data().age,
                interests: doc.data().interests,
                gender:doc.data().gender,
                online: doc.data().online,
                image: doc.data().image,
                sexual_orientation: doc.data().sexual_orientation,
                job_title:doc.data().job_title,
                skills:doc.data().skills,
                countries_travelled:doc.data().countries_travelled,
                countries_lived: doc.data().countries_lived,
                favourite_cities:doc.data().favourite_cities,
                latitude: Number(doc.data().latitude),
                longitude:Number(doc.data().longitude),
                city:doc.data().city,
                about: doc.data().about,
                chatrooms: doc.data().chatrooms,
                distance: getDistance(Number(doc.data().latitude), Number(doc.data().longitude), currentUserLatitude, currentUserLongitude,'K', doc.data().uid, currentUserId) 
            })
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

    return sortUsersByDistance(usersArray);
}

// to get chats based on chatroom id
export const getChatsByChatroomId = async (chatroomId:string) => {
    const q = query(collection(db, 'Chatrooms'), where("uid","==", chatroomId));
    const chatroom = []
    try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            chatroom.push(doc.data())
        })
        // to remove the nesting of the object
        return {...chatroom["0"]}
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}



// to get current Users' chatrooms list => get this from currentUserDetails.chatrooms
export const getCurrentUserChatDetails= async (currentUserDetails) => {
    const chatroomArray=[]
    const chatroomIdList:UserChatroom[] = currentUserDetails?.chatrooms
    try {
        if(chatroomIdList) {
            for (let i = 0; i<chatroomIdList.length; i++) {
                let chatroomData = await getChatsByChatroomId(chatroomIdList[i].chatroomId)
                chatroomArray.push(chatroomData)
            }
        }
    } catch(error) {
        console.log(error)
        throw new Error(error)
    }
    
    return chatroomArray;
}

export const getUserChatroomIdList = async (userId) => {
    let chatroomIdList = []
    try{
        const userDetails = await getUserDetails(userId);
        userDetails.chatrooms.forEach(room => chatroomIdList.push(room.chatroomId))
        return chatroomIdList;
    }catch(error) {
        console.log(error)
        throw new Error(error)
    }
}

export const chatroomExist = (chatUserId, currentUserId, chatroomIdList) => {
    const chatroomId = [chatUserId + currentUserId, currentUserId + chatUserId]
    for(let i=0; i<chatroomId.length; i++) {
        console.log(chatroomIdList)
        if(chatroomIdList.find(id => id === chatroomId[i])) return chatroomId[i]
    }
    return false;
}

export const createChatroom = async (chatUserDetails, currentUserDetails, newChatroom) => {
    // check if chatroom exists
    
    let chatroomId:string;

    // if chatroom does not exist
    // create chatroom in Chatrooms doc
    chatroomId =  newChatroom.uid
    const newChatUserChatrooms = [...chatUserDetails.chatrooms, {
        chatroomId: chatroomId,
        userId: currentUserDetails.uid
    }]
    const newCurrentUserChatrooms = [...currentUserDetails.chatrooms, {
        chatroomId: chatroomId,
        userId: chatUserDetails.uid
    }]

    try {
        await setDoc(doc(db, 'Chatrooms', chatroomId),newChatroom);
        console.log('chatroom created in chatrooms doc')
    } catch(error) {
        console.log(error)
        throw new Error(error)
    }
    // update currentUser and chatUser chatrooms
    try{
       await updateUserDetails({chatrooms: newChatUserChatrooms},chatUserDetails.uid);
       await updateUserDetails({chatrooms: newCurrentUserChatrooms},currentUserDetails.uid);
       console.log('new chatroom added to users doc')
    } catch(error) {
        console.log(error)
        throw new Error(error)
    }
    // fetch new users data
    try {
        const updatedCurrentUserDetails = await getUserDetails(currentUserDetails.uid)
        const updatedUserChatDetails = await getCurrentUserChatDetails(currentUserDetails)
        return {
            chatroomId,
            updatedCurrentUserDetails,
            updatedUserChatDetails
        }
    } catch(error) {
        console.log(error)
        throw new Error(error)
    }
}

export const createSingleChat = (chatText, chatroomId, chatUserDetails, currentUserDetails) => {
    if(!chatText || !chatroomId || !chatUserDetails || !currentUserDetails) throw new Error()
    return {
        dateTime: Date.now(),
        uid: chatUserDetails.uid + currentUserDetails.uid+ Date.now().toString(),
        chatroomId: chatroomId,
        message:chatText || '',
        status: false, // read = true or unread = false
        user: {
            uid: chatUserDetails.uid,
            username: chatUserDetails.username
        }
    }
}

export const updateSingleChatroom = async (singleChat: SingleChat, currentUserChatDetails: Chatroom[]) => {
    // assume chatroom already exists
    let newCurrentUserChatDetails = [];
    try {
        const q = query(collection(db, 'Chatrooms'), where("uid","==", singleChat.chatroomId));
        // returns a chatroom object
        const querySnapshot = await getDocs(q)
        let chatroomID:string
        querySnapshot.forEach((doc) => {
            chatroomID = doc.id
        })
        const chatRef = doc(db, 'Chatrooms', chatroomID)

        let chatData:Chatroom = await getChatsByChatroomId(singleChat.chatroomId);
        chatData.chats.push(singleChat)
        const newChatData:Chatroom = {
            ...chatData, 
            lastChat: singleChat
        }
        await setDoc(chatRef, newChatData, {merge:true})
        console.log('chatroom data updated successfully')

        newCurrentUserChatDetails = currentUserChatDetails.filter(chatroom => chatroom.uid !== singleChat.chatroomId).push(newChatData)
       
        // return this to set state
        return newCurrentUserChatDetails
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}

export const deleteChatroom = async (chatroomId:string, chatUserDetails:string, currentUserDetails:string) => {
    const q = query(collection(db, 'Chatrooms'), where("uid","==", chatroomId));
    const querySnapshot = await getDocs(q)
    let chatroomUID:string;
    // update chatrooms
    try{
        querySnapshot.forEach(async(doc) => {
            chatroomUID = doc.id
        })
        let chatRef = doc(db,"Chatrooms",chatroomUID);
        await deleteDoc(chatRef)
        console.log('chatroom deleted from db successfully')
    } catch(error) {
        console.log(error);
        throw new Error(error)
    }
    // update user chats
    try{
        const newUserChatrooms = chatUserDetails.chatrooms.filter(chat => chat.chatroomId !== chatroomId)
        const newCurrentUserChatrooms = currentUserDetails.chatrooms.filter(chat => chat.chatroomId !== chatroomId)
        await updateUserDetails({chatrooms: newUserChatrooms },chatUserDetails.uid);
        await updateUserDetails({chatrooms: newCurrentUserChatrooms}, currentUserDetails.uid)
        console.log('chatroom deleted from both users chatrooms db')
    } catch(error) {
        console.log(error);
        throw new Error(error)
    }
    
    try {
        const newUserChatDetails = await getCurrentUserChatDetails(currentUserDetails)
        const newCurrentUserDetails = await getUserDetails(currentUserDetails.uid);
        // return this to set state
        return {
            newUserChatDetails,
            newCurrentUserDetails
        }
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

/*
********************* Setting up Chat Context *****************************

*/

// interface ChatProps {
//     // to be filled
// }

const ChatContext = createContext<ChatProps>({
    chatUsers:null,
    userChatDetails: null,
    setUserChatDetails: () => {},
    setChatUsers: () => {},
    loadingChat:false,
    loadingChatUsers:false,
    placeholderImages: null,
})

export const ChatProvider = ({children}) => {
    const [loadingChat, setLoadingChat] = useState(false)
    const [loadingChatUsers, setLoadingChatUsers] = useState(false)
    // firebase user
    const [userChatDetails, setUserChatDetails] = useState(null)
    const [chatUsers, setChatUsers] = useState(null) 
    const {currentUserDetails, loading} = useAuth();
    const [chatroomIdList, setChatroomIdList] = useState(null)
    const maleImagePlaceholder = "https://unsplash.com/photos/uuVguyksViA"
    const femaleImagePlaceholder = "https://unsplash.com/photos/uuVguyksViA"
    const placeholderImages = [maleImagePlaceholder, femaleImagePlaceholder]

    useEffect(() => {
        // get ChatUsers on mount
        setLoadingChatUsers(true) 
        setLoadingChat(true)
        try {
            if(currentUserDetails) {
                getChatUsersDetails(currentUserDetails?.city, currentUserDetails?.latitude, currentUserDetails?.longitude, currentUserDetails.uid)
                    .then(data => setChatUsers(data))
                    .catch(error => {throw new Error(error)})
                console.log('chat users loaded')
            }            
        } catch (error) {
            console.log(error);
            setLoadingChatUsers(false)
            throw new Error(error)
        }
        // get UserChatDetails 
        try {
            if(currentUserDetails) {
                getCurrentUserChatDetails(currentUserDetails)
                    .then(data => setUserChatDetails(data))
                    .catch(error => {throw new Error(error)})
                console.log('current user chat details loaded')
            } 
        } catch (error) {
            console.log(error);
            setLoadingChat(false)
            throw new Error(error)
        }
        // get list of chatrooms
        try{
            if(currentUserDetails) {
                getUserChatroomIdList(currentUserDetails.uid)
                    .then(data => setChatroomIdList(data))
                    .catch(error => {throw new Error(error)})
                console.log('user chat room id list loaded')
            }
        } catch (error) {
            console.log('Chatroom list not loaded');
            throw new Error(error)
        }


        setLoadingChatUsers(false)
        setLoadingChat(false)
    }, [currentUserDetails])

    // more performant
    // similar to useEffect but only re-compute if one of the dependencies changes
    const memoedValue = useMemo(() => ({
        loadingChat,
        loadingChatUsers,
        userChatDetails,
        setUserChatDetails,
        chatUsers,
        setChatUsers,
        placeholderImages,
        chatroomIdList,
        setChatroomIdList
    }), [loadingChat, loadingChatUsers, userChatDetails, chatUsers, chatroomIdList])

    return (
        <ChatContext.Provider value={memoedValue}>
            {children}
        </ChatContext.Provider>
    );
}

export function chatService() {
    return useContext(ChatContext);
};
