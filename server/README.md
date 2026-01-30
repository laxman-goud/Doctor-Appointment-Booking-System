# MediBook Server

This is the backend server for the MediBook Doctor Appointment Booking System. It's built with Node.js and Express and handles all API requests, database interactions, and authentication.

## 📂 Features

- **User Authentication**: API endpoints for user registration and login, with JWT for secure authentication
- **Admin Authentication**: Separate API for admin login and access control
- **Doctor Authentication**: Dedicated API for doctors to log in and manage their data
- **Doctor Management**: Endpoints for adding, listing, and managing doctors
- **Appointment Management**: APIs to book, cancel, complete, and list appointments for both users and doctors
- **Payment Processing**: Integration with Razorpay for handling appointment fees
- **File Uploads**: Using Multer and Cloudinary for doctor image uploads

## 🛠️ Technologies Used

- **Node.js**: The server-side runtime environment
- **Express**: The web framework used to build the API
- **MongoDB**: The database used for data storage. The Mongoose library is used for schema definitions
- **JWT (jsonwebtoken)**: For creating and verifying authentication tokens
- **bcrypt**: For securely hashing and comparing passwords
- **Cloudinary**: Used for managing and hosting doctor profile images
- **Multer**: Middleware for handling `multipart/form-data` and file uploads
- **cors**: Middleware to enable Cross-Origin Resource Sharing
- **dotenv**: To load environment variables from a `.env` file
- **Razorpay**: Payment gateway SDK for processing online payments
- **Google Gemini AI**: AI-powered doctor bio generation for admin panel

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud instance)
- Cloudinary account for image storage
- Razorpay account for payment processing

### Quick Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/laxman-goud/Doctor-Appointment-Booking-System.git
   cd Doctor-Appointment-Booking-System/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment variables:**

   Create a `.env` file in the `server`. <br>
   Refer to the example files for the required environment variables:  

   - [.env.example](.env.example)  


4. **Run the server:**
   ```bash
   npm run server
   ```

The server will start at `http://localhost:4000`. The base API route is `/api`.

## 📁 Project Structure

```
server/
├── controllers/           # Route handlers and business logic
│   ├── adminController.js
│   ├── doctorController.js
│   └── userController.js
├── middleware/           # Custom middleware functions
│   ├── auth.js          # Authentication middleware
│   ├── multer.js        # File upload middleware
│   └── upload.js        # Cloudinary upload utilities
├── models/              # Mongoose schemas and models
│   ├── doctorModel.js
│   ├── userModel.js
│   └── appointmentModel.js
├── routes/              # API route definitions
│   ├── adminRoute.js
│   ├── doctorRoute.js
│   └── userRoute.js
├── config/              # Configuration files
│   ├── mongodb.js       # Database connection
│   └── cloudinary.js    # Cloudinary configuration
├── .env                 # Environment variables
├── server.js            # Main server file
└── package.json         # Dependencies and scripts
```

## 🔌 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `POST /update-profile` - Update user profile
- `GET /doctors` - Get all doctors
- `POST /book-appointment` - Book an appointment
- `GET /appointments` - Get user appointments
- `POST /cancel-appointment` - Cancel appointment
- `POST /payment-razorpay` - Process payment

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /add-doctor` - Add new doctor
- `GET /doctors` - Get all doctors
- `POST /change-availability` - Change doctor availability
- `GET /appointments` - Get all appointments
- `POST /cancel-appointment` - Cancel appointment (admin)

### Doctor Routes (`/api/doctor`)
- `POST /login` - Doctor login
- `GET /appointments` - Get doctor's appointments
- `POST /complete-appointment` - Mark appointment as completed
- `POST /cancel-appointment` - Cancel appointment (doctor)
- `GET /dashboard` - Get doctor dashboard data
- `GET /profile` - Get doctor profile
- `POST /update-profile` - Update doctor profile

## 🔒 Authentication & Security

- **JWT Tokens**: Used for secure authentication across all routes
- **Password Hashing**: bcrypt is used to hash passwords before storing
- **Middleware Protection**: Protected routes require valid JWT tokens
- **Role-based Access**: Different access levels for users, doctors, and admins
- **CORS Configuration**: Proper CORS setup for cross-origin requests

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on how to contribute to this project.

---

**Part of the MediBook Doctor Appointment Booking System**