import { assets } from "../assets/assets";  // Importing static assets such as images

const About = () => {
    return (
        <div>
            {/* --- Page Title --- */}
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
            </div>

            {/* --- About Section: Image + Description --- */}
            <div className='my-10 flex flex-col md:flex-row gap-12'>
                {/* About image */}
                <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="about_img" />

                {/* About text content */}
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                    <p>
                        Welcome to MediBook, your trusted partner in managing your healthcare needs conveniently and efficiently.
                        At MediBook, we understand the challenges individuals face when it comes to scheduling doctor appointments
                        and managing their health records.
                    </p>
                    <p>
                        MediBook is committed to excellence in healthcare technology. We continuously strive to enhance our platform,
                        integrating the latest advancements to improve user experience and deliver superior service.
                        Whether you're booking your first appointment or managing ongoing care, MediBook is here to support you every step of the way.
                    </p>

                    {/* Vision Section */}
                    <b className='text-gray-800'>Our Vision</b>
                    <p>
                        Our vision at MediBook is to create a seamless healthcare experience for every user.
                        We aim to bridge the gap between patients and healthcare providers, making it easier
                        for you to access the care you need, when you need it.
                    </p>
                </div>
            </div>

            {/* --- Why Choose Us Section --- */}
            <div className='text-xl my-4'>
                <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
            </div>

            {/* --- Features List --- */}
            <div className='flex flex-col md:flex-row mb-20'>
                {/* Feature 1: Efficiency */}
                <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Efficiency:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>

                {/* Feature 2: Convenience */}
                <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Convenience:</b>
                    <p>Access to a network of trusted healthcare professionals in your area.</p>
                </div>

                {/* Feature 3: Personalization */}
                <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Personalization:</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>
            </div>
        </div>
    )
}

export default About;
