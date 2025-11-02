// Import dependencies and controllers
import express from "express"
import { 
  doctorList, 
  loginDoctor, 
  appointmentsDoctor, 
  appointmentCancel, 
  appointmentComplete, 
  doctorDashboard, 
  getDoctorProfile, 
  updateDoctorProfile 
} from "../controllers/doctorController.js"
import authDoctor from "../middlewares/authDoctor.js"  // Middleware for doctor authentication

// Initialize express router
const doctorRouter = express.Router()

// Get list of all doctors (public route)
doctorRouter.get('/list', doctorList)

// Doctor login route
doctorRouter.post('/login', loginDoctor)

// Get all appointments assigned to a specific doctor (requires authentication)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)

// Cancel a patient appointment by doctor (requires authentication)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)

// Mark appointment as completed (requires authentication)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)

// Get doctor’s dashboard statistics (requires authentication)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)

// Get doctor’s personal profile (requires authentication)
doctorRouter.get('/profile', authDoctor, getDoctorProfile)

// Update doctor’s profile details (requires authentication)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

// Export router for main app use
export default doctorRouter
