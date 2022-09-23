import { getStorage, ref, uploadBytes } from "firebase/storage";

export const CapFirstCharacter = (str:string) => {
    if (!str) return ''

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const uploadImageToFirestore = async (imgURL) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'testing.jpg')
    await uploadBytes(storageRef, imgURL).then(snapshot => {
        console.log(snapshot)
        console.log('uploaded image successfully')
    })
}