// Importing dependencies and context
import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Sidebar = () => {

    // Access tokens to determine which sidebar menu to display
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    return (
        // Sidebar container with full height and border
        <div className='min-h-screen bg-white border-r'>

            {/* Admin Sidebar Menu (visible when admin is logged in) */}
            {
                aToken && (
                    <ul className='text-[#515151] mt-5'>
                        {/* Admin Dashboard */}
                        <NavLink
                            to="/admin-dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="home" />
                            <p className='hidden md:block'>Dashboard</p>
                        </NavLink>

                        {/* All Appointments */}
                        <NavLink
                            to="/all-appointments"
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="appointment" />
                            <p className='hidden md:block'>Appointments</p>
                        </NavLink>

                        {/* Add Doctor */}
                        <NavLink
                            to="/add-doctor"
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                                }`
                            }
                        >
                            <img src={assets.add_icon} alt="add" />
                            <p className='hidden md:block'>Add Doctor</p>
                        </NavLink>

                        {/* Doctor List */}
                        <NavLink
                            to="/doctor-list"
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="people" />
                            <p className='hidden md:block'>Doctors List</p>
                        </NavLink>
                    </ul>
                )
            }

            {/* Doctor Sidebar Menu (visible when doctor is logged in) */}
            {
                dToken && (
                    <ul className='text-[#515151] mt-5'>
                        {/* Doctor Dashboard */}
                        <NavLink
                            to="/doctor-dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="home" />
                            <p className='hidden md:block'>Dashboard</p>
                        </NavLink>

                        {/* Doctor Appointments */}
                        <NavLink
                            to="/doctor-appointments"
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="appointment" />
                            <p className='hidden md:block'>Appointments</p>
                        </NavLink>

                        {/* Doctor Profile */}
                        <NavLink
                            to="/doctor-profile"
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="people" />
                            <p className='hidden md:block'>Profile</p>
                        </NavLink>
                    </ul>
                )
            }
        </div>
    )
}

export default Sidebar
