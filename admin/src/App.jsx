// Importing React and other required modules
import React from 'react'
import Login from './pages/Login' // Login page component
import { ToastContainer } from 'react-toastify' // For toast notifications
import 'react-toastify/dist/ReactToastify.css' // Toast styles

// Importing Contexts
import { AdminContext } from './context/AdminContext.jsx'
import { DoctorContext } from './context/DoctorContext.jsx'
import { useContext } from 'react'

// Importing shared layout components
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'

// Importing routing utilities
import { Route, Routes } from 'react-router-dom'

// Importing Admin pages
import Dashboard from './pages/Admin/Dashboard.jsx'
import AllAppointments from './pages/Admin/AllAppointments.jsx'
import AddDoctor from './pages/Admin/AddDoctor.jsx'
import DoctorsList from './pages/Admin/DoctorsList.jsx'

// Importing Doctor pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx'
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx'
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx'
import NotFound from './pages/NotFound.jsx'

const App = () => {

  // Extract authentication tokens from contexts
  const { aToken } = useContext(AdminContext)  // Admin token
  const { dToken } = useContext(DoctorContext) // Doctor token

  // If either Admin or Doctor is logged in → show the main dashboard
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      {/* Toast notification container */}
      <ToastContainer />

      {/* Top navigation bar */}
      <Navbar />

      {/* Sidebar and content area */}
      <div className='flex items-start'>
        <Sidebar />

        {/* Route definitions for both Admin and Doctor panels */}
        <Routes>
          <Route
            path="/"
            element={aToken ? <Dashboard /> : <DoctorDashboard />}
          />
          {/* --- Admin Routes --- */}
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/* --- Doctor Routes --- */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />

          {/* 404 Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  ) : (
    // If no user is logged in → show login page
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
