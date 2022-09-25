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

/*
https://www.geodatasource.com/developers/javascript
This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::

*/

export function getDistance(lat1, lon1, lat2, lon2, unit, userId, currentUserId) {
	if(currentUserId === userId) {
        // if current user, then set to zero
        return 0;
    }
    if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
    if(!lat1 || !lon1 || !lat2 || !lon2) {
        // if latitude/longitude not provide, set default distance to 1 km
        return 1;
    }

	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

export const sortUsersByDistance = (chatUsersData) => {
    return chatUsersData.slice().sort((a, b) => a.distance - b.distance)
}

export const displayDistance = (distance) => {
    distance= Number(distance)
    return distance < 1 ? Math.floor(distance*1000).toString() + 'm away' : distance.toFixed(1) + ' km away'
}

export const genRandBetweenRange = (min:number, max:number) => {
    const diff = max - min
    return Math.floor(Math.random() * diff) + min
}