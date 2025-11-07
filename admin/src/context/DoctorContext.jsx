// Context for managing Doctor-related state and API operations
import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    // Fetch all appointments for the doctor
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dtoken: dToken } });
            data.success ? setAppointments(data.appointments) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Mark appointment as completed
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, { headers: { dtoken: dToken } });
            data.success ? (toast.success(data.message), getAppointments()) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Cancel an appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { dtoken: dToken } });
            data.success ? (toast.success(data.message), getAppointments()) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Fetch doctor dashboard data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dtoken: dToken } });
            data.success ? setDashData(data.dashData) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Fetch doctor profile data
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { dtoken: dToken } });
            data.success ? setProfileData(data.profileData) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Shared context values
    const value = {
        dToken, setDToken,
        backendUrl,
        appointments, setAppointments, getAppointments,
        completeAppointment, cancelAppointment,
        dashData, getDashData, setDashData,
        profileData, getProfileData, setProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
