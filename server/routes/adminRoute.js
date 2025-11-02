// Import dependencies and controllers
import express from "express"
import { 
  addDoctor, 
  adminDashboard, 
  adminLogin, 
  allDoctors, 
  appointmentCancel, 
  appointmentsAdmin 
} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"        // Middleware for handling image uploads
import authAdmin from "../middlewares/authAdmin.js"  // Middleware for admin authentication
import { changeAvailability } from "../controllers/doctorController.js" // Function to change doctor availability

// Initialize express router
const adminRouter = express.Router()

// Admin route to add a new doctor (requires authentication and image upload)
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor)

// Admin login route
adminRouter.post("/login", adminLogin)

// Fetch all registered doctors (requires admin authentication)
adminRouter.post("/all-doctors", authAdmin, allDoctors)

// Change doctor availability status (requires authentication)
adminRouter.post("/change-availability", authAdmin, changeAvailability)

// Fetch all appointments for admin dashboard (requires authentication)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)

// Cancel a user appointment by admin (requires authentication)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)

// Get overall admin dashboard statistics (requires authentication)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

// Export router for use in main server file
export default adminRouter
