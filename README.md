# MediBook - Doctor Appointment Booking System

MediBook is a web application designed to simplify the process of booking and managing doctor appointments. This repository contains the full-stack code for the system, which is divided into three main components: a client-side application for users, an admin panel, and a backend server to handle all business logic and data.

## 🌟 Features

- **User-friendly interface**: Intuitive and easy-to-navigate design for patients to find and book appointments
- **Doctor Profiles**: Detailed profiles for each doctor, including their specialty, experience, and availability
- **Appointment Management**: Users can view and manage their upcoming appointments
- **Admin Panel**: A dedicated panel for administrators to manage doctors, patients, and all appointments
- **Doctor Panel**: A dedicated panel for doctors to manage their own appointments and profile details
- **Payment Integration**: Secure online payment options for booking appointments

## 📁 Project Structure

The repository is organized into three main folders:

```
medibook/
├── client/          # Front-end code for the patient-facing web application
├── admin/           # Front-end code for the administration and doctor panel
└── server/          # Back-end code for the API, database, and server-side logic
```

## 🛠️ Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces
- **Vite**: A fast front-end build tool
- **Tailwind CSS**: A utility-first CSS framework for styling

### Backend
- **Node.js**: A JavaScript runtime environment
- **Express**: A web application framework for Node.js
- **MongoDB**: A NoSQL database for storing application data
- **Cloudinary**: Cloud service for image and video management
- **jsonwebtoken**: JSON Web Token implementation for authentication
- **bcrypt**: A library to help hash passwords
- **Razorpay**: Payment gateway integration

## 🚀 Getting Started

To get the project up and running on your local machine, please refer to the individual `README.md` files in each of the sub-directories for detailed setup instructions:

- [Client Setup](./client/README.md)
- [Admin Panel Setup](./admin/README.md)
- [Server Setup](./server/README.md)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Doctor-Appointment-Booking-System.git
   cd Doctor-Appointment-Booking-System
   ```

2. **Install dependencies for all components**
   ```bash
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   
   # Install admin dependencies
   cd ../admin && npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in the server directory
   - Configure your MongoDB connection string, Cloudinary credentials, and Razorpay keys

4. **Start the development servers**
   ```bash
   # Start backend server (from server directory)
   npm run server
   
   # Start client application (from client directory)
   npm run dev
   
   # Start admin panel (from admin directory)
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for more details.

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.


**Made with ❤️ for better healthcare accessibility**