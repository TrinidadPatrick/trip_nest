import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Search, MapPin, Star, Compass, Globe, Camera, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css';
import japan from '../../Utilities/Images/Country_BG/Japan.jpg'
import japan_ls from '../../Utilities/Images/Country_BG/Japan_ls.jpg'
import china_ls from '../../Utilities/Images/Country_BG/China_ls.jpg'
import korea_ls from '../../Utilities/Images/Country_BG/Korea_ls.jpg'
import singapore_ls from '../../Utilities/Images/Country_BG/Singapore_ls.jpg'
import thailand_ls from '../../Utilities/Images/Country_BG/Thailand_ls.jpg'
import vietnam_ls from '../../Utilities/Images/Country_BG/Vietnam_ls.jpg'
import indonesia_ls from '../../Utilities/Images/Country_BG/Indonesia_ls.jpg'
import malaysia_ls from '../../Utilities/Images/Country_BG/Malaysia_ls.jpg'
import philippines_ls from '../../Utilities/Images/Country_BG/Philippines_ls.jpg'
import AutoCompleteSearch from './AutoCompleteSearch';
import useLocation from '../../Hooks/LocationProvider';

const Landing = () => {
  const {userLocation} = useLocation()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Japan',
    image: japan,
    bg_image: japan_ls
  });
  const [isVisible, setIsVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const swiperRef = useRef(null);
  const swiperRef_2 = useRef(null);
  
  // Memoize countries array to prevent recreation on each render
  const countries = useMemo(() => [
    { name: 'Japan', bg_image: japan_ls },
    { name: 'China', bg_image: china_ls },
    { name: 'Korea', bg_image: korea_ls },
    { name: 'Singapore', bg_image: singapore_ls },
    { name: 'Thailand', bg_image: thailand_ls },
    { name: 'Vietnam', bg_image: vietnam_ls },
    { name: 'Indonesia', bg_image: indonesia_ls },
    { name: 'Malaysia', bg_image: malaysia_ls },
    { name: 'Philippines', bg_image: philippines_ls }
  ], []);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize callback to prevent recreation
  const handleSelectCountry = useCallback((country) => {
    if (swiperRef.current?.swiper) {
      const countryIndex = countries.findIndex(c => c.name === country.name);
      if (countryIndex !== -1) {
        swiperRef.current.swiper.slideTo(countryIndex);
        setSelectedCountry(country);
      }
    }
  }, [countries]);

  // Memoize slide change handler
  const handleSlideChange = useCallback((swiper) => {
    const index = swiper.realIndex;
    const country = countries[index];
    if (country) {
      handleSelectCountry(country);
    }
  }, [countries, handleSelectCountry]);

  // Memoize navigation handlers
  const handlePrevSlide = useCallback(() => {
    screenWidth >= 1024 ? swiperRef_2.current?.swiper.slidePrev() : swiperRef.current?.swiper.slidePrev()
    screenWidth < 1024 && setSelectedCountry(countries[swiperRef?.current.swiper.realIndex])
  }, []);

  const handleNextSlide = useCallback(() => {
    screenWidth >= 1024 ? swiperRef_2.current?.swiper.slideNext() : swiperRef.current?.swiper.slideNext();
    screenWidth < 1024 && setSelectedCountry(countries[swiperRef?.current.swiper.realIndex])
  }, []);

  return (
    <main className='w-full bg-gray-800 h-fit relative grid grid-cols-1 lg:grid-cols-2 pt-20'>
      {/* Background Swiper */}
      <div className='w-full h-full absolute'>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            reverseDirection: false,
            stopOnLastSlide: false,
            waitForTransition: true,
          }}
          onAutoplay={handleSlideChange}
          ref={swiperRef}
          spaceBetween={0}
          slidesPerView={1}
          allowTouchMove={screenWidth >= 1024 ? false : true}
          effect='fade'
          loop={true}
          modules={[EffectFade, screenWidth <= 1024 ? Autoplay : Pagination]}
          className='absolute top-0 left-0 w-full h-full z-[1] bg-gray-800'
          speed={600}
          lazy="true"
          preloadimages="false"
        >
          {countries.map((country, index) => (
            <SwiperSlide key={country.name}>
              {/* Use transform3d for hardware acceleration */}
              <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-transparent to-black opacity-65 z-10 transform-gpu' />
              <div 
                style={{
                  backgroundImage: `url('./Country_BG/${country.name}_ls.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }} 
                className="brightness-75 h-full transform-gpu will-change-transform"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Left Side */}
      <div className={`flex z-[2] flex-col px-12 py-10 space-y-8 transform transition-all duration-700 ease-out will-change-transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
      }`}>
        
        {/* Introduction Text */}
        <div className="space-y-6 flex flex-col items-center lg:items-start ">
          <div className="inline-flex w-fit items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
            <MapPin size={16} />
            <span className="text-sm">Discover Amazing Places</span>
          </div>
          
          <h1 className="text-6xl text-shadow-lg lg:text-7xl font-bold text-white leading-tight text-center lg:text-start">
            EXPLORE
            <br />
            <p className=" text-shadow-lg text-center lg:text-start text-theme-normal">
              {selectedCountry.name.toUpperCase()}
            </p>
          </h1>
          
          <p className="text-lg text-center lg:text-start text-white/70 max-w-lg leading-relaxed">
            Discover breathtaking destinations around the world. From ancient temples to pristine beaches, 
            create unforgettable memories with our curated travel experiences.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full max-w-lg mx-auto lg:mx-0 ">
          <div className="relative group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xs opacity-30 transition-opacity duration-300" />
              <div className="relative flex items-center backdrop-blur-xs rounded-full border border-white/20 shadow-full">
                <div className="flex items-center pl-6 pr-4 py-4">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <input
                  value={searchQuery}
                  onChange={(e)=>setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search destinations"
                  className="flex-1 bg-transparent text-gray-100 placeholder-gray-300 text-lg font-medium outline-none py-4 pr-6"
                />
                <button className="absolute right-1.5 cursor-pointer px-8 py-3 bg-theme-normal rounded-full text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Search
                </button>
              </div>
            </div>
          </div>
          <AutoCompleteSearch searchQuery={searchQuery} />
        </div>
      </div>

      {/* Right Side */}
      <div className='h-full pb-10 lg:py-10 lg:px-10'>
        <Swiper
          hidden={screenWidth >= 1024 ? false : true}
          spaceBetween={0}
          slidesPerView={screenWidth >= 1100 ? 1 : 1}
          ref={swiperRef_2}
          onSlideChange={handleSlideChange}
          modules={[Navigation]}
          loop={true}
          speed={400} // Faster transition
          lazy="true"
          preloadimages="false"
          watchSlidesProgress={true}
        >
          {countries.map((country, index) => (
            <SwiperSlide key={country.name} className='p-5 lg:p-3 xl:p-5'>
              <div className='w-full h-[450px] grid grid-cols-2 gap-3'>
                <div style={{backgroundImage: `url('/Country_BG/${country?.name}.jpg')`,backgroundSize: 'cover', backgroundPosition: 'center'}}  className='bg-red-100 rounded-xl row-span-2' />
                <div style={{backgroundImage: `url('/Country_BG/${country?.name}_ls_2.jpg')`,backgroundSize: 'cover', backgroundPosition: 'center'}} className='bg-red-100 rounded-xl' />
                <div style={{backgroundImage: `url('/Country_BG/${country?.name}_ls_3.jpg')`,backgroundSize: 'cover', backgroundPosition: 'center'}} className='bg-red-100 rounded-xl' />
              </div>
              {/* <div 
                style={{
                  backgroundImage: `url(${country.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} 
                className={`${
                  selectedCountry.name === country.name ? 'scale-105 brightness-120' : 'scale-90 brightness-75'
                } transform transition-transform duration-300 ease-out cursor-grab h-[450px] bg-white/10 backdrop-blur-sm rounded-lg will-change-transform`}
              /> */}
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Navigation */}
        <div className='w-full relative z-10 flex justify-between items-center mt-5 px-4'>
          <button 
            onClick={handlePrevSlide}
            className="group cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg will-change-transform"
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="flex space-x-2">
            {countries.map((country, index) => (
              <div 
                key={country.name}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedCountry.name === country.name ? 'bg-white scale-125' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNextSlide}
            className="group cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg will-change-transform"
          >
            <ChevronRight size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default Landing