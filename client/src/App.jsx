import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importing all the page components
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';

// Importing layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importing toast notification setup
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    // Main container with horizontal margins for layout spacing
    <div className='mx-4 sm:mx-[10%]'>

      {/* Toast container for showing global notifications */}
      <ToastContainer />

      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Define application routes */}
      <Routes>

        {/* Home page route */}
        <Route path='/' element={<Home />} />

        {/* Doctors listing page */}
        <Route path='/doctors' element={<Doctors />} />

        {/* Filtered doctors list by specialty (dynamic route) */}
        <Route path='/doctors/:specialty' element={<Doctors />} />

        {/* Login page route */}
        <Route path='/login' element={<Login />} />

        {/* About page route */}
        <Route path='/about' element={<About />} />

        {/* Contact page route */}
        <Route path='/contact' element={<Contact />} />

        {/* User profile page */}
        <Route path='/my-profile' element={<MyProfile />} />

        {/* User's appointment list page */}
        <Route path='/my-appointments' element={<MyAppointments />} />

        {/* Appointment booking page (dynamic doctor ID route) */}
        <Route path='/appointment/:docId' element={<Appointment />} />

      </Routes>

      {/* Footer visible on all pages */}
      <Footer />
    </div>
  );
};

export default App;
