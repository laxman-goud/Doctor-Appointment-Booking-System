import { v2 as cloudinary } from 'cloudinary'

// Function to connect and configure Cloudinary with environment variables
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,   // Your Cloudinary cloud name
        api_key: process.env.CLOUDINARY_API_KEY,   // Cloudinary API key
        api_secret: process.env.CLOUDINARY_SECRET_KEY  // Cloudinary API secret
    })
}

export default connectCloudinary;
