// Importing the necessary dependencies
import { createRoot } from 'react-dom/client'   // React 18+ API for rendering components
import App from './App.jsx'                     // Main application component
import './index.css'                            // Global stylesheet (Tailwind + custom CSS)
import { BrowserRouter } from 'react-router-dom' // Enables client-side routing
import AppContextProvider from './context/AppContext' // Context Provider for global state management

// Rendering the root React component into the HTML div with id='root'
createRoot(document.getElementById('root')).render(
  // Enables routing across the app
  <BrowserRouter>
    {/* Provides global context (like user data, theme, etc.) to the entire app */}
    <AppContextProvider>
      {/* Main application component */}
      <App />
    </AppContextProvider>
  </BrowserRouter>
)
