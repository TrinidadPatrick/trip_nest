import React from 'react'
import Landing from './Landing'
import FeaturedLocations from './FeaturedLocations'

const MainLandingPage = () => {
  return (
    <main className='w-full h-full relative'>
        <Landing />
        <FeaturedLocations />
    </main>
  )
}

export default MainLandingPage