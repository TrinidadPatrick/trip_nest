import React from 'react'
import { Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
        // <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black opacity-55'></div>
        <header>
            <nav className='py-5 w-full fixed px-10  z-[999] flex justify-between items-center'>
                <p className=' font-bold text-2xl text-gray-200'>TripNest</p>
                {/* Navigation items */}
                <ul className='flex items-center gap-x-10 text-white'>
                    <li>Home</li>
                    <li>Explore</li>
                    <li>About Us</li>
                </ul>
            </nav>
        </header>
  )
}

export default Navbar