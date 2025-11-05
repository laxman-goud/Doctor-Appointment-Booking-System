import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// Create a new context for global state management
export const AppContext = createContext();

const AppContextProvider = (props) => {

    // Currency symbol used across the app
    const currencySymbol = '$';

    // Get backend URL from environment variable
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Global state variables
    const [doctors, setDoctors] = useState([]); // Stores all doctors fetched from backend
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false); // JWT token for authentication
    const [userData, setUserData] = useState(false); // Stores logged-in user data

    /**
     * Fetch all doctors from backend API
     */
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            
            if (data.success) {
                setDoctors(data.doctors); // Update state with doctors list
            } else {
                toast.error(data.message); // Show error if fetching fails
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Fetch user profile data if token is available
     */
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/get-profile`,
                { headers: { token } }
            );
            
            if (data.success) {
                setUserData(data.userData); // Store user data in state
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    // Context value to be shared across components
    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    };

    /**
     * Fetch doctors list on component mount
     */
    useEffect(() => {
        getDoctorsData();
    }, []);

    /**
     * Load user data whenever token changes
     */
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false); // Clear user data if logged out
        }
    }, [token]);

    return (
        // Provide context to all child components
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
