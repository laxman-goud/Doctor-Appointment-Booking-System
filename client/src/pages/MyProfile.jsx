import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import api from '../../utils/axios';

const MyProfile = () => {

    // Access global states and functions from context
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

    // Local states for edit mode and image upload
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    // Function to update user profile data
    const updateUserProfileData = async () => {
        try {
            // Prepare form data for sending (including optional image)
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);
            image && formData.append('image', image); // only append if image is selected

            // API call to update user profile
            const { data } = await api.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message); // show success message
                await loadUserProfileData(); // reload updated user data
                setIsEdit(false); // exit edit mode
                setImage(false); // reset image state
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Render only if userData is available
    return userData && (
        <div className='max-w-lg flex flex-col gap-3 text-sm'>
            {
                // Profile image section
                isEdit ? (
                    <label htmlFor="image">
                        <div className="relative inline-block cursor-pointer group">
                            {/* Profile Image Preview */}
                            <img
                                className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow-md transition duration-300 group-hover:opacity-70"
                                src={image ? URL.createObjectURL(image) : userData.image}
                                alt="user_image"
                            />

                            {/* Upload Icon Overlay on hover */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition">
                                <img
                                    className="w-10"
                                    src={assets.upload_icon}
                                    alt="upload_icon"
                                />
                            </div>
                        </div>

                        {/* Hidden input for file upload */}
                        <input
                            type="file"
                            id="image"
                            hidden
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                ) : (
                    // Non-edit mode profile image
                    <img
                        className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow-md"
                        src={userData.image}
                        alt="user_image"
                    />
                )
            }

            {/* Display or edit user name */}
            {
                isEdit
                    ? (
                        <input
                            className='bg-gray-100 text-3xl font-medium max-w-60 mt-4'
                            value={userData.name}
                            type='text'
                            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                        />
                    )
                    : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none' />

            {/* Contact Information Section */}
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>

                    {/* Phone Field */}
                    <p className='font-medium'>Phone:</p>
                    {
                        isEdit ? (
                            <input
                                className='bg-gray-100 max-w-52'
                                value={userData.phone}
                                type='text'
                                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        ) : (
                            <p className='text-blue-400'>{userData.phone}</p>
                        )
                    }

                    {/* Address Field */}
                    <p className='font-medium'>Address: </p>
                    {
                        isEdit ? (
                            <p>
                                <input
                                    className='bg-gray-100'
                                    value={userData.address?.line1 || ""}
                                    type='text'
                                    onChange={e =>
                                        setUserData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value }
                                        }))
                                    }
                                />
                                <br />
                                <input
                                    className='bg-gray-100'
                                    value={userData.address?.line2 || ""}
                                    type='text'
                                    onChange={e =>
                                        setUserData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value }
                                        }))
                                    }
                                />
                            </p>
                        ) : (
                            <p className='text-gray-500'>
                                {userData.address?.line1}
                                <br />
                                {userData.address?.line2}
                            </p>
                        )
                    }
                </div>
            </div>

            {/* Basic Information Section */}
            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>

                    {/* Gender Field */}
                    <p className='font-medium'>Gender: </p>
                    {
                        isEdit
                            ? (
                                <select
                                    className='max-w-20 bg-gray-100'
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                    value={userData.gender}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            )
                            : <p className='text-gray-400'>{userData.gender}</p>
                    }

                    {/* DOB Field */}
                    <p className='font-medium'>Birthday: </p>
                    {
                        isEdit
                            ? (
                                <input
                                    className='bg-gray-100 max-w-28'
                                    value={userData.dob}
                                    type='date'
                                    onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                />
                            )
                            : <p className='text-gray-400'>{userData.dob}</p>
                    }
                </div>
            </div>

            {/* Action Buttons */}
            <div className='mt-10'>
                {
                    isEdit
                        ? <button
                            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                            onClick={updateUserProfileData}
                        >
                            Save information
                        </button>
                        : <button
                            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                            onClick={() => setIsEdit(true)}
                        >
                            Edit
                        </button>
                }
            </div>
        </div>
    )
}

export default MyProfile
