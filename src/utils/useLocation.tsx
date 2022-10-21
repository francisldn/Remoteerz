// @ts-nocheck
import * as Location from 'expo-location';
import React, {createContext, useContext, useEffect, useState, useMemo} from 'react';

export const LocationContext = createContext({
  latitude: null,
  longitude: null,
  city: '',
  country: '',
  district: '',
  isoCountryCode: '',
  name: '',
  postalCode: '',
  street: '',
  region: '',
  subregion: '',
  timezone: '',
  timestamp: null,
})

export async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('status denied')
        throw new Error('Location service disabled')
      }
    try {
      let loc = await Location.getCurrentPositionAsync()
      const {city, country, district, isoCountryCode, name, postalCode, street, region, subregion, timezone} = (await Location.reverseGeocodeAsync({accuracy:1,latitude:loc.coords.latitude, longitude:loc.coords.longitude}))[0]
      return {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        city: city,
        country:country,
        district: district,
        countryCode: isoCountryCode,
        placeName: name,
        postalCode: postalCode,
        street:street,
        region:region,
        subregion: subregion,
        timezone: timezone,
        timestamp: loc.timestamp
      }
    } catch (error) {
      console.log('failed to get user location')
    }
  }

export const LocationProvider = ({children}) => {
  const [currentUserLocation, setCurrentUserLocation] = useState('')
  const [locationLoading, setLocationLoading] = useState(true)

  
  async function convertAddressToLatLong(address) {
    try{
      const data = await Location.geocodeAsync(address)
      return data
    } catch (error) {
      console.log(error)
      return
    }
  }
  
  const memoedValue = useMemo(() => ({
    setCurrentUserLocation,
    getCurrentLocation,
    currentUserLocation,
    locationLoading,
    convertAddressToLatLong,
    setLocationLoading
  }),[currentUserLocation, locationLoading])

  return (
    <LocationContext.Provider value={memoedValue}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  return useContext(LocationContext)
}
