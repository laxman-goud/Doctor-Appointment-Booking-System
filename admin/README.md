# MediBook Admin and Doctor Panels

This is the dedicated front-end application for the administrative and doctor panels of the MediBook system. It's built with React and Vite and allows authorized users to manage key aspects of the application.

## 📂 Features

### Admin Features
- **Admin Dashboard**: A high-level overview for the administrator, showing statistics like the number of doctors, patients, and appointments
- **Doctors List**: An interface to view all registered doctors and change their availability status
- **Add Doctor**: A form for the administrator to add new doctors to the system
- **All Appointments**: A list of all appointments in the system, with the ability to cancel them

### Doctor Features
- **Doctor Dashboard**: A specialized dashboard for doctors, showing their earnings, number of patients, and upcoming appointments
- **Doctor Profile**: Doctors can view and edit their professional information
- **Doctor Appointments**: A list of a specific doctor's appointments, with options to mark them as completed or cancel them

## 🛠️ Technologies Used

- **React**: The core library for building the user interface
- **React Router Dom**: For handling client-side routing within the admin panel
- **Vite**: A build tool that provides a fast development environment
- **Tailwind CSS**: Used for all styling and responsive design
- **Axios**: For making API requests to the server
- **React Toastify**: For displaying toast notifications and user feedback

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see [server README](../server/README.md))

### Quick Setup

1. **Navigate to the admin directory:**
   ```bash
   cd Doctor-Appointment-Booking-System/admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment variables:**
   
   Create a `.env` file in the `admin` directory and add the backend URL:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

The admin panel will be available at `http://localhost:5174`.

## 📁 Project Structure

```
admin/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx    # Navigation component
│   │   └── Sidebar.jsx   # Sidebar navigation
│   ├── pages/            # Page components
│   │   ├── Admin/        # Admin-specific pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AllAppointments.jsx
│   │   │   ├── AddDoctor.jsx
│   │   │   └── DoctorsList.jsx
│   │   └── Doctor/       # Doctor-specific pages
│   │       ├── DoctorDashboard.jsx
│   │       ├── DoctorAppointments.jsx
│   │       └── DoctorProfile.jsx
│   ├── context/          # React context for state management
│   │   ├── AdminContext.jsx
│   │   └── DoctorContext.jsx
│   ├── assets/           # Images, icons, and other assets
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE.md) file for details.

## 🤝 Contributing
Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

---

**Part of the MediBook Doctor Appointment Booking System**
