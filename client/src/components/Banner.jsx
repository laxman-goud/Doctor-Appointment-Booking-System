// Import React and required hooks/assets
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

// Banner component – displays promotional text and navigation button
const Banner = () => {

    const navigate = useNavigate()  // Used for page navigation

    return (
        // Main container with background color, padding, and rounded edges
        <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
            
            {/* Left Side - Banner Text and Button */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                {/* Heading Text */}
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p>Book Appointment</p>
                    <p className='mt-4'>With 100+ Trusted Doctors</p>
                </div>

                {/* Button to navigate to Login page */}
                <button 
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                    className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
                >
                    Create account
                </button>
            </div>

            {/* Right Side - Appointment Image */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img 
                    className='w-full absolute bottom-0 right-0 max-w-md' 
                    src={assets.appointment_img} 
                    alt="appointment_img" 
                />
            </div>
        </div>
    )
}

export default Banner
