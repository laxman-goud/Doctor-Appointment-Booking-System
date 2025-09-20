import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

// API to register a user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(200).json({ message: "Please fill all the fields.", success: false });
        }
        if (!validator.isEmail(email)) {
            return res.status(200).json({ message: "Please enter a valid email.", success: false })
        }
        if (password.length < 8) {
            return res.status(200).json({ message: "Password must be at least 8 characters long.", success: false })
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // inserting the user into the database
        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        res.json({ message: "User registered successfully.", success: true, token });

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).json({ message: "Please fill all the fields.", success: false });
        }
        if (!validator.isEmail(email)) {
            return res.status(200).json({ message: "Please enter a valid email.", success: false })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "User not found.", success: false })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Incorrect password.", success: false })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        res.json({ message: "Login successful.", success: true, token });

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password');

        res.json({ userData, success: true });
    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        const userId = req.userId;

        if (!name || !phone || !dob || !gender) {
            return res.status(400).json({ message: "Please fill all the fields.", success: false });
        }

        // Ensure address is parsed correctly (if it's a string)
        let parsedAddress = address;
        if (typeof address === "string") {
            try {
                parsedAddress = JSON.parse(address);
            } catch {
                return res.status(400).json({ message: "Invalid address format", success: false });
            }
        }

        const updateData = { name, phone, address: parsedAddress, dob, gender };

        // If image uploaded, add it
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        // Update in one go
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.json({ message: "Profile updated successfully.", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", success: false });
    }
};

//. API to book Appointment
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body;
        const userId = req.userId;

        const docData = await doctorModel.findById(docId).select('-password');
        if(!docData.available){
            return res.status(200).json({ message: "Doctor is not available", success: false });
        }

        let slots_booked = docData.slots_booked;

        // checking slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.status(200).json({ message: "Slot is already booked", success: false });
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }
        else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime); 
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            docData,
            userData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: new Date()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slots_booked });

        res.json({success: true, message: "Appointment booked successfully."});

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };