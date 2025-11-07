// Importing necessary dependencies and contexts
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    // Accessing admin and doctor tokens + their setter functions from context
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    // Navigation hook for route redirection
    const navigate = useNavigate()

    // Logout function clears stored tokens and redirects to homepage
    const logout = () => {
        navigate('/') // Navigate to home route after logout
        aToken && setAToken('') // Clear admin token from context
        aToken && localStorage.removeItem('aToken') // Remove admin token from localStorage
        dToken && setDToken('') // Clear doctor token from context
        dToken && localStorage.removeItem('dToken') // Remove doctor token from localStorage
    }

    return (
        // Navbar layout container
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            {/* Left section: logo and role indicator */}
            <div className='flex items-center gap-2 text-xsl'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="logo" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {aToken ? 'Admin' : 'Doctor'} {/* Display role based on token */}
                </p>
            </div>

            {/* Right section: logout button */}
            <button 
                onClick={logout} 
                className='bg-primary text-white text-sm px-10 py-2 rounded-full'>
                Logout
            </button>
        </div>
    )
}

export default Navbar
