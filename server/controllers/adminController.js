import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
import main from '../config/gemini.js';

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

// API to get all doctors list
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select("-password");
        res.json({ doctors, success: true, doctors });

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ appointments, success: true });
    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to cancel an appointment
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId).select('-password');
        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ message: "Appointment cancelled successfully", success: true });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        const users = await userModel.find({}).select('-password');
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ dashData, success: true });

    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to generate doctor bio using AI
const generateDoctorBio = async (req, res) => {

    try {
        const { name, speciality, experience, education } = req.body;

        const prompt = `
            Write a professional doctor bio in exactly 1 line.

            Rules:
            - Do not add headings, options, or explanations
            - Keep it concise and patient-friendly
            - Output only the bio text

            Details:
            Name: ${name}
            Speciality: ${speciality}
            Experience: ${experience}
            Education: ${education}
            `;

        const content = await main(
            prompt
        )

        res.json({ success: true, content })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export { addDoctor, adminLogin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, generateDoctorBio };