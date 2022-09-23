// @ts-nocheck
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import 'firebase/compat/storage'

export const CapFirstCharacter = (str:string) => {
    if (!str) return ''

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const uploadImageToFirestore = async (imgURL) => {
    const storage = getStorage(); //storage instance
    // convert imgURL to Blob (bytes)
    const response = await fetch(imgURL);
    const bytes = await response.blob();
    const filename= imgURL.substring(imgURL.lastIndexOf('/')+1);
    const storageRef = ref(storage, filename)
    try {
        await uploadBytes(storageRef, bytes).then(snapshot => console.log('upload image successful'))
        const uploadTask = uploadBytesResumable(storageRef, filename)
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        return url
    } catch (error) {
        console.log(error)
    }   
}

