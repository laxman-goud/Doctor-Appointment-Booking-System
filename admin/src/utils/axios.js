import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

/**
 * Auto logout on JWT expiry or invalid token
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Remove admin token
            localStorage.removeItem("aToken");

            // Optional: remove doctor token if shared login
            localStorage.removeItem("dToken");

            // Redirect to admin login
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;