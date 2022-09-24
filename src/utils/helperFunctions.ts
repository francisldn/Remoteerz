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
    try {
        const response = await fetch(imgURL);
        const bytes = await response.blob();
        const filename= imgURL.substring(imgURL.lastIndexOf('/')+1);
        const imgType = filename.split('.')[1]
        const metadata = {contentType: `image/${imgType}`}
        const storageRef = ref(storage, filename)
        // await uploadBytesResumable(storageRef, bytes, metadata).then(snapshot => {
        //     console.log(snapshot);
        //     console.log('upload image successful');
        // })
        const uploadTask = uploadBytesResumable(storageRef, filename)

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
                        return downloadURL;
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

