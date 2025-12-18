import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useLocation = () => {
    const api_key = import.meta.env.VITE_LOCATION_IQ_KEY
    const [userLocation, setUserLocation] = useState(null)

    const getUserLocation = async () => {
        return new Promise((resolve, reject) => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(async(position)=>{
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    try {
                        const result = await axios.get(`https://us1.locationiq.com/v1/reverse?key=${api_key}&lat=${latitude}&lon=${longitude}&format=json&`)
                        setUserLocation(result.data)
                        resolve(result.data)
                    } catch (error) {
                        reject(error)
                    }
                }, (error)=>{
                    reject(error)
                })
            }
        })
    }

  return {
    userLocation, getUserLocation
  }
}

export default useLocation