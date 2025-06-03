import React, { useEffect, useState } from 'react'
import { Search, MapPin, Star, Compass, Globe, Camera, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import bg_hero from '../../Utilities/Images/BG/hero_bg_torn_v3.png'
import tirn from '../../Utilities/Images/BG/torn.png'


const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  return (
    <main  className='w-full min-h-screen relative bg-cover bg-no-repeat grid grid-cols-2 pt-20'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black opacity-55' />
      <img src={bg_hero} className='absolute object-bottom object-cover w-[100svw] h-full z-[-1]' />

      {/* Left Side */}
      <div className={`flex flex-col px-12 py-5 space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                <MapPin size={16} />
                <span className="text-sm">Discover Amazing Places</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                EXPLORE
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  PARADISE
                </span>
              </h1>
              
              <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                Discover breathtaking destinations around the world. From ancient temples to pristine beaches, 
                create unforgettable memories with our curated travel experiences.
              </p>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Start Journey</span>
                <ChevronRight size={20} />
              </button>
              
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Plan Trip</span>
              </button>
            </div> */}

            {/* Search Input */}
            <div className="w-full max-w-lg">
              <div className="relative group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative flex items-center  backdrop-blur-xs rounded-full border border-white/20 shadow-full">
                    <div className="flex items-center pl-6 pr-4 py-4">
                      <Search className="w-6 h-6 text-gray-300" />
                    </div>
                    <input
                      type="text"
                      // value={searchQuery}
                      // onChange={(e) => setSearchQuery(e.target.value)}
                      // onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                      placeholder="Search destinations"
                      className="flex-1 bg-transparent text-gray-100 placeholder-gray-300 text-lg font-medium outline-none py-4 pr-6"
                    />
                    <button
                      // onClick={handleSearch}
                      className="mr-1.5 cursor-pointer px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="flex space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">250+</div>
                <div className="text-white/60 text-sm">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/60 text-sm">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-white/60 text-sm">Rating</div>
              </div>
            </div> */}
          </div>
    </main>
  )
}

export default Landing