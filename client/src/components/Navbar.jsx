// Import React, hooks, and necessary modules
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

// Navbar component — handles navigation and authentication display
const Navbar = () => {

    const navigate = useNavigate();                     // Used for page redirection
    const { token, setToken, userData } = useContext(AppContext);  // Global context data
    const [showMenu, setShowMenu] = useState(false);    // Toggle for mobile menu

    // Function to log out user and remove token
    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        // Main navbar container
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>

            {/* Logo — navigates to home on click */}
            <img
                onClick={() => { navigate('/') }}
                className='w-44 cursor-pointer'
                src={assets.logo}
                alt="logo"
            />

            {/* Desktop Navigation Links */}
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
                <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
                <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
                <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
            </ul>

            {/* Right Side — User section or Login button */}
            <div className='flex items-center gap-4'>
                <a href="https://github.com/laxman-thedev/Doctor-Appointment-Booking-System" class="max-md:hidden flex gap-1.5 bg-primary text-white btn py-2.5 px-5 rounded-full text-sm hover:bg-white hover:text-primary border hover:border-primary" aria-label="GitHub Repository" rel="noopener noreferrer"><svg class="size-5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"></path></svg>Star On GitHub</a>
                {
                    token && userData ? (
                        // Logged-in user dropdown
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 h-8 rounded-full' src={userData.image} alt="profile_pic" />
                            <img className='w-3' src={assets.dropdown_icon} alt="dropdown" />

                            {/* Dropdown menu visible on hover */}
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => { navigate('/my-profile') }} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => { navigate('/my-appointments') }} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Show "Create Account" button when logged out
                        <button
                            onClick={() => { navigate('/login') }}
                            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
                        >
                            Create account
                        </button>
                    )
                }

                {/* Mobile Menu Icon */}
                <img
                    onClick={() => { setShowMenu(true) }}
                    className='w-6 md:hidden'
                    src={assets.menu_icon}
                    alt="menu_icon"
                />

                {/* Mobile Navigation Drawer */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    {/* Header section with logo and close button */}
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="logo" />
                        <img
                            className='w-7'
                            onClick={() => { setShowMenu(false) }}
                            src={assets.cross_icon}
                            alt="cross_icon"
                        />
                    </div>

                    {/* Mobile Navigation Links */}
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => { setShowMenu(false) }} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false) }} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false) }} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false) }} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                        {/* Mobile GitHub Star Button */}
                        <div className="mt-6 px-5">
                            <a
                                href="https://github.com/laxman-thedev/Doctor-Appointment-Booking-System"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Repository"
                                onClick={() => setShowMenu(false)}
                                className="flex items-center justify-center gap-2 text-primary border border-primary px-3 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all"
                            >
                                {/* GitHub Icon */}
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 
                                            10.32 10.32 0 0 0-3.393 6.17 
                                            10.48 10.48 0 0 0 1.317 6.955 
                                            10.045 10.045 0 0 0 5.4 4.418
                                            c.504.095.683-.223.683-.494 
                                            0-.245-.01-1.052-.014-1.908
                                            -2.78.62-3.366-1.21-3.366-1.21
                                            a2.711 2.711 0 0 0-1.11-1.5
                                            c-.907-.637.07-.621.07-.621
                                            .317.044.62.163.885.346
                                            .266.183.487.426.647.71
                                            .135.253.318.476.538.655
                                            a2.079 2.079 0 0 0 2.37.196
                                            c.045-.52.27-1.006.635-1.37
                                            -2.219-.259-4.554-1.138-4.554-5.07
                                            a4.022 4.022 0 0 1 1.031-2.75
                                            3.77 3.77 0 0 1 .096-2.713
                                            s.839-.275 2.749 1.05
                                            a9.26 9.26 0 0 1 5.004 0
                                            c1.906-1.325 2.74-1.05 2.74-1.05
                                            .37.858.406 1.828.101 2.713
                                            a4.017 4.017 0 0 1 1.029 2.75
                                            c0 3.939-2.339 4.805-4.564 5.058
                                            a2.471 2.471 0 0 1 .679 1.897
                                            c0 1.372-.012 2.477-.012 2.814
                                            0 .272.18.592.687.492
                                            a10.05 10.05 0 0 0 5.388-4.421
                                            10.473 10.473 0 0 0 1.313-6.948
                                            10.32 10.32 0 0 0-3.39-6.165
                                            A9.847 9.847 0 0 0 12.007 2Z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <span>Star on GitHub</span>
                            </a>
                        </div>


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
