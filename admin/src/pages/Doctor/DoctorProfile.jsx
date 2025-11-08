// Importing modules and required contexts
import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    // Destructuring context data and functions
    const { dToken, profileData, getProfileData, setProfileData, backendUrl } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)

    // Local state for edit mode
    const [isEdit, setIsEdit] = useState(false)

    // Function to update profile details
    const updateProfile = async () => {
        const updateData = {
            address: profileData.address,
            fees: profileData.fees,
            available: profileData.available
        }

        const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, { ...updateData }, { headers: { dtoken: dToken } })

        if (data.success) {
            toast.success(data.message)
            setIsEdit(false)
            getProfileData()
        } else {
            toast.error(data.message)
        }
    }

    // Fetch profile data when doctor token is available
    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    // Render profile section
    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>

                {/* Doctor image */}
                <div>
                    <img className='bg-primary w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="doctor_img" />
                </div>

                {/* Profile details section */}
                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

                    {/* Name and degree */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    {/* About section */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
                    </div>

                    {/* Appointment fee (editable) */}
                    <p className='text-gray-600 font-medium mt-4'>
                        Appointment fees: <span className='text-gray-800'>
                            {currency}
                            {isEdit ? (
                                <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} />
                            ) : profileData.fees}
                        </span>
                    </p>

                    {/* Address fields (editable) */}
                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {isEdit ? (
                                <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                            ) : profileData.address.line1}
                            <br />
                            {isEdit ? (
                                <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                            ) : profileData.address.line2}
                        </p>
                    </div>

                    {/* Availability toggle */}
                    <div className='flex gap-1 pt-2'>
                        <input onChange={() => { isEdit && setProfileData(prev => ({ ...prev, available: !prev.available })) }} checked={profileData.available} type="checkbox" className='w-4 h-4 rounded-full' />
                        <label>Available</label>
                    </div>

                    {/* Edit / Save buttons */}
                    {isEdit ? (
                        <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>
                            Save
                        </button>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>
                            Edit
                        </button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile