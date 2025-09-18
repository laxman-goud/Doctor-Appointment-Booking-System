import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// API for adding a doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ message: "Please fill all the fields.", success: false });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email.", success: false })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long.", success: false })
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // uploading the image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // inserting the doctor into the database
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ message: "Doctor added successfully.", success: true });

    } catch (error) {
        res.status(500).json({ message: "Internal server error.", success: false });
    }
}

// API for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email }, 
                process.env.JWT_SECRET,
                { expiresIn: "10d" }
            );

            return res.json({
                message: "Login successful.",
                success: true,
                token
            });
        }

        return res.status(200).json({
            message: "Invalid credentials.",
            success: false
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error.", success: false });
    }
};


export { addDoctor, adminLogin }