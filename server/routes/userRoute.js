// Import dependencies and controllers
import express from "express"
import { 
  registerUser, 
  loginUser, 
  getProfile, 
  updateProfile, 
  bookAppointment, 
  listAppointments, 
  cancelAppointment, 
  paymentRazorpay, 
  verifyRazorpay 
} from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"  // Middleware for user authentication
import upload from "../middlewares/multer.js"      // Middleware for handling profile image uploads

// Initialize express router
const userRouter = express.Router()

// User registration route
userRouter.post("/register", registerUser)

// User login route
userRouter.post("/login", loginUser)

// Get logged-in user profile (requires authentication)
userRouter.get("/get-profile", authUser, getProfile)

// Update user profile with optional image upload (requires authentication)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)

// Book a new appointment (requires authentication)
userRouter.post("/book-appointment", authUser, bookAppointment)

// Fetch all user appointments (requires authentication)
userRouter.get("/appointments", authUser, listAppointments)

// Cancel a booked appointment (requires authentication)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)

// Initialize Razorpay payment process (requires authentication)
userRouter.post("/payment-razorpay", authUser, paymentRazorpay)

// Verify Razorpay payment (requires authentication)
userRouter.post("/verify-razorpay", authUser, verifyRazorpay)

// Export router for main server use
export default userRouter
