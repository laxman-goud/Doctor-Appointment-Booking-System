// Importing required modules and contexts
import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

    // Destructuring values and functions from contexts
    const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { slotDateFormat, currency } = useContext(AppContext)

    // Fetch dashboard data when doctor token becomes available
    useEffect(() => {
        if (dToken) {
            getDashData()
        }
    }, [dToken])

    // Render only if dashboard data exists
    return dashData && (
        <div className='m-5'>

            {/* Top summary cards */}
            <div className='flex flex-wrap gap-3'>

                {/* Earnings card */}
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.earning_icon} alt="earning_icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
                        <p className='text-gray-400'>Earnings</p>
                    </div>
                </div>

                {/* Appointments card */}
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="appointment_icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>

                {/* Patients card */}
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="patients_icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest bookings list */}
            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                    <img src={assets.list_icon} alt="list_icon" />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>

                {/* Appointment list */}
                <div className='pt-4 border border-t-0'>
                    {dashData.latestAppointments.map((item, index) => (
                        <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                            {/* Patient image */}
                            <img className='rounded-full w-10' src={item.userData.image} alt="user_img" />

                            {/* Appointment details */}
                            <div className='flex-1 text-sm'>
                                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                            </div>

                            {/* Appointment actions */}
                            {item.cancelled ? (
                                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            ) : item.isCompleted ? (
                                <p className='text-green-500 text-xs font-medium'>Completed</p>
                            ) : (
                                <div className='flex'>
                                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel_icon" />
                                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="tick_icon" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
