# MediBook Client

This is the front-end application for the MediBook Doctor Appointment Booking System, built using React and Vite. It provides a user-friendly interface for patients to browse doctors, book appointments, and manage their profiles.

## 📂 Features

- **Home Page**: Displays featured doctors and specialties
- **Doctors Page**: Allows users to filter and search for doctors by specialty
- **Appointment Booking**: A detailed page for booking an appointment with a specific doctor, showing available slots
- **User Authentication**: Secure login and registration for patients
- **User Profile**: Users can view and update their personal information
- **My Appointments**: A dashboard for users to view their upcoming and past appointments

## 🛠️ Technologies Used

- **React**: The core library for building the user interface
- **React Router Dom**: For handling client-side routing
- **Vite**: A build tool that provides a fast development environment
- **Tailwind CSS**: Used for all styling, ensuring a responsive and modern design
- **Axios**: A promise-based HTTP client for making API requests to the server
- **React Toastify**: For displaying toast notifications

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see [server README](../server/README.md))

### Quick Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/laxman-goud/Doctor-Appointment-Booking-System.git
   cd Doctor-Appointment-Booking-System/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment variables:**
   
   Create a `.env` file in the `client` directory and add the following variables or refer `.env.example`. These are for connecting to the backend server and Razorpay for payments:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── context/          # React context for state management
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
Contributions are welcome! Please read the [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on how to contribute to this project.

---

**Part of the MediBook Doctor Appointment Booking System**