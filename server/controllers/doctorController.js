import doctorModel from '../models/doctorModel.js';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

const changeAvailability = async (req, res) => {
    try {
        
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

        res.json({ message: "Availability changed successfully.", success: true });

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ doctors, success: true });
    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.status(200).json({ message: "Doctor not found.", success: false });
        }
        const isMatch = await bycrpt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(200).json({ message: "Incorrect password.", success: false });
        }

        const token = jwt.sign(
            { id: doctor._id },
            process.env.JWT_SECRET
        );
        res.json({ message: "Login successful.", success: true, token });

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to get doctor appointments
const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({ docId });

        res.json({ appointments, success: true });
    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to mark an appointment as completed
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.docId;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData  && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ message: "Appointment completed successfully.", success: true });
        }
        else {
            return res.json({ message: "Appointment not found.", success: false });
        }

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

// API to mark an appointment as cancel
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.docId;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData  && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ message: "Appointment cancelled successfully.", success: true });
        }
        else {
            return res.json({ message: "Appointment not found.", success: false });
        }

    } catch (error) {
        res.json({ message: "Internal server error.", success: false });
    }
}

export {changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete}; 