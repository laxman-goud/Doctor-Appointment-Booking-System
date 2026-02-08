import { useNavigate } from 'react-router-dom'
import { FaStethoscope } from 'react-icons/fa'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            
            <div className="text-center max-w-lg">

                {/* Animated Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-6 rounded-full animate-bounce">
                        <FaStethoscope className="text-primary text-5xl" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-7xl font-bold text-primary">404</h1>

                <h2 className="text-2xl font-semibold mt-3 text-gray-800">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-2">
                    Oops! The page you are looking for doesn’t exist or has been moved.  
                    Let’s get you back to your healthcare journey.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-6 py-2 rounded-full shadow hover:scale-105 transition-all"
                    >
                        Go to Home
                    </button>

                    <button
                        onClick={() => navigate('/doctors')}
                        className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                        Find Doctors
                    </button>

                </div>

                {/* Extra hint */}
                <p className="text-xs text-gray-400 mt-6">
                    MediBook • Your trusted healthcare companion
                </p>
            </div>
        </div>
    )
}

export default NotFound
