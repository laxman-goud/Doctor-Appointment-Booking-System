// Context for managing Admin-related state and API operations
import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    // State variables
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    // Fetch all doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { token: aToken } });
            data.success ? setDoctors(data.doctors) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Toggle doctor availability
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { token: aToken } });
            data.success ? (toast.success(data.message), getAllDoctors()) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Fetch all appointments
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { token: aToken } });
            data.success ? setAppointments(data.appointments) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Cancel an appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { token: aToken } });
            data.success ? (toast.success(data.message), getAllAppointments()) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Fetch admin dashboard data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { token: aToken } });
            data.success ? setDashData(data.dashData) : toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    // Shared context values
    const value = {
        aToken, setAToken,
        backendUrl,
        doctors, getAllDoctors, changeAvailability,
        appointments, setAppointments, getAllAppointments, cancelAppointment,
        dashData, getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
