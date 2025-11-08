// Importing required modules and contexts
import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

    // Destructuring values and functions from contexts
    const { dToken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    // Fetch all appointments once the doctor token is available
    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            {/* Appointment table container */}
            <div className='bg-white border rounded min-h-[50vh] text-sm max-h-[80vh] overflow-y-scroll'>

                {/* Table header for large screens */}
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {/* Appointment rows */}
                {appointments.reverse().map((item, index) => (
                    <div
                        className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
                        key={index}
                    >
                        <p className='max-sm:hidden'>{index + 1}</p>

                        {/* Patient info */}
                        <div className='flex items-center gap-2'>
                            <img className='w-8 rounded-full' src={item.userData.image} alt="user_img" />
                            <p>{item.userData.name}</p>
                        </div>

                        {/* Payment method */}
                        <div>
                            <p className='text-xs inline border border-primary px-2 rounded-full'>
                                {item.payment ? 'ONLINE' : 'CASH'}
                            </p>
                        </div>

                        {/* Patient age */}
                        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

                        {/* Appointment date & time */}
                        <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                        {/* Appointment fee */}
                        <p>{currency}{item.amount}</p>

                        {/* Appointment action (cancel/complete) */}
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
    )
}

export default DoctorAppointments
