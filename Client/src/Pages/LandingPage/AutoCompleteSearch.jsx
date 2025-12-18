import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Search, X } from 'lucide-react';
import axios from 'axios'

const AutoCompleteSearch = ({searchQuery}) => {
  const api_key = import.meta.env.VITE_LOCATION_IQ_KEY
  const debounceRef = useRef(null);
  const [places, setPlaces] = useState([])

  const handleAutoCompleteSearch = async (searchValue) => {
    try {
      const result = await axios.get(`https://api.locationiq.com/v1/autocomplete?key=${api_key}&q=${searchValue || 'darasa'}&limit=10&dedupe=1&`)
      const places_result = result.data.filter((result)=> result.class == 'place')
      setPlaces(places_result)
    } catch (error) {
      console.log(error)
      setPlaces([])
    }
  }

  useEffect(()=>{

    if(searchQuery){
      if(debounceRef?.current){
        clearTimeout(debounceRef.current)
      }
  
      debounceRef.current = setTimeout(()=>{
        handleAutoCompleteSearch(searchQuery)
      },1000)
  
      return () =>{
        if(debounceRef?.current){
          clearTimeout(debounceRef.current)
        }
      }
    }

  },[searchQuery])
  

  return (
    <>
    {
      places.length > 0 && searchQuery.length !== 0 &&
      <div className='absolute z-[9999] bg-white translate-y-2.5 rounded max-w-lg w-full max-h-[200px] overflow-auto'>
      {
        places?.length > 0 && places.map((place,index)=>{
          return (
            <div key={index} className='flex border-b border-gray-200 items-center justify-between p-2 cursor-pointer' onClick={()=>{console.log(place)}}>
              <div className='flex justify-center items-center  p-2 rounded'>
                <MapPin className='w-5 h-5 text-gray-500' />
              </div>
              <div className='w-full flex flex-col px-3'>
                <p className=' font-semibold'>{place.display_place}</p>
                <p className='text-sm text-gray-500 leading-relaxed'>{place.display_name}</p>
              </div>
            </div>
          )
        })
      }
    </div>
    }
    </>
  )
}

export default AutoCompleteSearch