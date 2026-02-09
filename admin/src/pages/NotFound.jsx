import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const NotFound = () => {
    const navigate = useNavigate()
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const goDashboard = () => {
        if (aToken) navigate('/admin-dashboard')
        else if (dToken) navigate('/doctor-dashboard')
        else navigate('/')
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
            
            {/* Card */}
            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full text-center relative overflow-hidden">

                {/* Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200/20 rounded-full"></div>

                {/* Optional Logo */}
                <img
                    src='./logo.png'
                    alt="logo"
                    className="w-28 mx-auto mb-6"
                />

                {/* 404 Text */}
                <h1 className="text-7xl font-extrabold text-primary tracking-widest animate-pulse">
                    404
                </h1>

                {/* Message */}
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>

                <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                    The page you are looking for doesn’t exist or may have been moved.
                    Let’s get you back to your dashboard.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <button
                        onClick={goDashboard}
                        className="px-6 py-2 bg-primary text-white rounded-full hover:scale-105 hover:shadow-md transition-all duration-300"
                    >
                        Go to Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                    >
                        Go Home
                    </button>
                </div>

                {/* Footer Text */}
                <p className="mt-6 text-xs text-gray-400">
                    MediBook • Smart Healthcare Management
                </p>
            </div>
        </div>
    )
}

export default NotFound