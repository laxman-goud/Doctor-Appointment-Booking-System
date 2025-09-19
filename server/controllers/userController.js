import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// API to register a user
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        if (!name || !email || !password) {
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

        // inserting the user into the database
        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData);
        const user =await newUser.save();

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
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields.", success: false });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email.", success: false })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found.", success: false })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password.", success: false })
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

export {registerUser, loginUser};