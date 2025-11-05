import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate(); // Used to programmatically navigate between routes
    const { doctors } = useContext(AppContext); // Access doctors data from global context

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            {/* Section Title */}
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>

            {/* Section Description */}
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* Doctors Grid */}
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    // Individual Doctor Card
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                    >
                        {/* Doctor Image */}
                        <img className='bg-blue-50' src={item.image} alt="doctor" />

                        {/* Doctor Details */}
                        <div className='p-4'>
                            {/* Availability Status */}
                            <div
                                className={`flex items-center gap-2 text-sm text-center ${
                                    item.available ? 'text-green-500' : 'text-gray-500'
                                }`}
                            >
                                <p
                                    className={`w-2 h-2 ${
                                        item.available ? 'bg-green-500' : 'bg-gray-500'
                                    } rounded-full`}
                                ></p>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>

                            {/* Doctor Name */}
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>

                            {/* Doctor Speciality */}
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* "More" Button to navigate to all doctors page */}
            <button
                onClick={() => {
                    navigate('/doctors');
                    scrollTo(0, 0);
                }}
                className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
            >
                More
            </button>
        </div>
    )
}

export default TopDoctors
