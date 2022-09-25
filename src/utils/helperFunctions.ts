// @ts-nocheck
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateUserDetails } from './useAuth';

export const CapFirstCharacter = (str:string) => {
    if (!str) return ''

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const uploadImageToFirestore = async (imgURL, userId) => {
    const storage = getStorage(); //storage instance
    // convert imgURL to Blob (bytes)
    try {
        const response = await fetch(imgURL);
        const bytes = await response.blob();
        console.log(bytes)
        const filename= imgURL.substring(imgURL.lastIndexOf('/')+1);
        const storageRef = ref(storage, filename)

        const uploadTask = uploadBytesResumable(storageRef, bytes)

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error)
                throw new Error(error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        updateUserDetails({image: downloadURL}, userId)
                            .then(() => console.log('image url successfully updated'))
                            .catch((error) => console.log(error))
                    })
                    .catch(error => {
                        console.log(error)
                        throw new Error(error)
                    })
        })

    } catch (error) {
        console.log(error)
    }   
}

