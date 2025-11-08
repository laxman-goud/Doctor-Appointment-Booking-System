// Importing necessary modules and hooks
import React, { useState } from 'react'
import { assets } from '../assets/assets' // Static assets (e.g., icons, images)
import { AdminContext } from '../context/AdminContext.jsx' // Context for admin authentication
import { useContext } from 'react'
import axios from 'axios' // For API requests
import { toast } from 'react-toastify' // For notifications
import { DoctorContext } from '../context/DoctorContext.jsx' // Context for doctor authentication

const Login = () => {

    // State to toggle between Admin and Doctor login
    const [state, setState] = useState('Admin')

    // Extracting methods and variables from context
    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)
    
    // Local state for form inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Function that handles login form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault() // Prevent page reload on form submit

        try {
            if (state === 'Admin') {
                // Admin login request
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
                
                // If login successful, store token and set context
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                } else {
                    toast.error(data.message)
                }
            } else {
                // Doctor login request
                const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })
                
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    console.log(data.token) // Debug log
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            // Display any network or API error
            toast.error(error.message)
        }
    }

    // UI structure for login form
    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-h-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                
                {/* Heading */}
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>

                {/* Email Input */}
                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        className='border border-[#DADADA] rounded-md w-full p-2 m-1' 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                    />
                </div>

                {/* Password Input */}
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        className='border border-[#DADADA] rounded-md w-full p-2 m-1' 
                        type="password" 
                        placeholder="Enter your password" 
                        required 
                    />
                </div>

                {/* Submit Button */}
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
                    Login
                </button>

                {/* Toggle between Admin and Doctor login */}
                {
                    state === 'Admin'
                        ? <p>Doctor Login? 
                            <span 
                                className='text-primary underline cursor-pointer' 
                                onClick={() => setState('Doctor')}
                            >
                                Click here
                            </span>
                        </p>
                        : <p>Admin Login? 
                            <span 
                                className='text-primary underline cursor-pointer' 
                                onClick={() => setState('Admin')}
                            >
                                Click here
                            </span>
                        </p>
                }
            </div>
        </form>
    )
}

export default Login
