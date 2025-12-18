import React, { useEffect, useState } from 'react'
import useLocation from '../../Hooks/LocationProvider'
import YouTube from 'react-youtube';
import axios from 'axios'

const FeaturedLocations = () => {
  const api_key = import.meta.env.VITE_GEOAPIFY_KEY
  const pixabay_key = import.meta.env.VITE_PIXABAY_KEY
  const unsplash_access_key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  const {getUserLocation} = useLocation()
  const [featuredLocations, setFeaturedLocations] = useState([])
  let videoElement = null

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const shortenQuery = (placeName, maxLength = 80) => {
    if(placeName.length <= maxLength) return placeName

    const cutIndex = placeName.lastIndexOf('', maxLength)
    return placeName.slice(0, cutIndex > 0 ? cutIndex : maxLength)
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getFeaturedLocations = async () => {
    const locations = []
    try {
      // Get the users location
      const userLocation =  await getUserLocation()
      const country = userLocation.address.country

      // Get the countryes bounding box
      const result = await axios.get(
        `https://nominatim.openstreetmap.org/search?country=${country}&format=json&limit=1`
      );
      const bbox = result.data[0].boundingbox;
      const minLat = parseFloat(bbox[0]);
      const maxLat = parseFloat(bbox[1]);
      const minLon = parseFloat(bbox[2]);
      const maxLon = parseFloat(bbox[3]);

      // Get the places from geoapify
      const places_result = await axios.get(`https://api.geoapify.com/v2/places?categories=tourism&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=50&apiKey=${api_key}`)
      const places = places_result.data.features

      // Get images from each place
      for (const place of places) {
        const props = place.properties;
        const place_name = props.name || props.street || shortenQuery(props.formatted.split(",")[0]);
        const image_result = await axios.get(`https://commons.wikimedia.org/w/api.php`, {
          params: {
            action: 'query',
            list: 'search',
            srsearch: place_name,
            srnamespace: 6, // Only search for images
            srlimit: 1,
            format: 'json',
            origin: '*'
          }
        });

        const firstResult = image_result.data.query?.search?.[0];
        if (firstResult) {
          const title = firstResult.title; // e.g., File:Manila Bay Sunset.jpg
          
          // Now request imageinfo for this file:
          const imageInfoResult = await axios.get(`https://commons.wikimedia.org/w/api.php`, {
            params: {
              action: 'query',
              titles: title,
              prop: 'imageinfo',
              iiprop: 'url',
              format: 'json',
              origin: '*'
            }
          });
          
          const pages = imageInfoResult.data.query?.pages;
          const page = Object.values(pages)[0];
          const imageUrl = page.imageinfo?.[0]?.url;
          
          console.log('Image URL:', imageUrl);
        }
      }
      setFeaturedLocations(locations)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
      // getFeaturedLocations()
  }, [])

  return (
    <div className='h-full w-full flex flex-col '>
      return <YouTube videoId="GOHd4DJfzOw" opts={opts} />;
    </div>
  )
}

export default FeaturedLocations