// Import React DOM’s createRoot API for rendering the app
import { createRoot } from 'react-dom/client'

// Import BrowserRouter for enabling routing across pages
import { BrowserRouter } from 'react-router-dom'

// Import global styles (Tailwind + custom)
import './index.css'

// Import the main App component
import App from './App.jsx'

// Import context providers for global state management
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

// Create the root element and render the app
createRoot(document.getElementById('root')).render(
  // Wrap the app with BrowserRouter for navigation support
  <BrowserRouter>
    {/* Provide global states for admin, doctor, and general app context */}
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          {/* Main application component */}
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)