// Import required packages
import express from "express"   // Express framework for creating the server and routes
import cors from "cors"         // CORS middleware to handle cross-origin requests
import "dotenv/config"          // Load environment variables from .env file

// Import configuration files and routes
import connectDB from "./config/mongodb.js"             // MongoDB connection setup
import connectCloudinary from "./config/cloudinary.js"  // Cloudinary configuration setup
import adminRouter from "./routes/adminRoute.js"        // Routes for admin functionalities
import doctorRouter from "./routes/doctorRoute.js"      // Routes for doctor functionalities
import userRouter from "./routes/userRoute.js"          // Routes for user functionalities

// Initialize express app
const app = express()

// Set port from environment or default to 4000
const port = process.env.PORT || 4000

// Connect to database and Cloudinary
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json()) // Parses incoming JSON requests
app.use(cors())         // Enables cross-origin resource sharing

// Define API routes
app.use("/api/admin", adminRouter)   // Admin-related routes
app.use('/api/doctor', doctorRouter) // Doctor-related routes
app.use('/api/user', userRouter)     // User-related routes

// Default route for testing API status
app.get("/", (req, res) => {
    res.send("API Working")
})

// Start the server
app.listen(port, () => {
    console.log(`✅ Server started successfully on port ${port}`)
})
