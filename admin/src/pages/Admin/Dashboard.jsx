// Importing required modules and contexts
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

    // Destructuring data and functions from contexts
    const { dashData, getDashData, aToken, cancelAppointment } = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)

    // Fetch dashboard data when admin token is available
    useEffect(() => {
        if (aToken) {
            getDashData()
        }
    }, [aToken])

    // Render dashboard only if data is available
    return dashData && (
        <div className='m-5'>
            
            {/* Dashboard summary cards */}
            <div className='flex flex-wrap gap-3'>
                
                {/* Doctors count card */}
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.doctor_icon} alt="doctor_icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
                        <p className='text-gray-400'>Doctors</p>
                    </div>
                </div>

                {/* Appointments count card */}
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="appointment_icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>

                {/* Patients count card */}
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="patients_icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest bookings section */}
            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                    <img src={assets.list_icon} alt="list_icon" />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>

                {/* List of latest appointments */}
                <div className='pt-4 border border-t-0'>
                    {dashData.latestAppointments.map((item, index) => (
                        <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                            {/* Doctor image */}
                            <img className='rounded-full w-10' src={item.docData.image} alt="doctor_img" />

                            {/* Appointment details */}
                            <div className='flex-1 text-sm'>
                                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                            </div>

                            {/* Appointment status display */}
                            {item.cancelled ? (
                                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            ) : item.isCompleted ? (
                                <p className='text-green-500 text-xs font-medium'>Completed</p>
                            ) : (
                                <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className='w-10 cursor-pointer'
                                    src={assets.cancel_icon}
                                    alt="cancel_icon"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
