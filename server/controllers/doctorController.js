import doctorModel from '../models/doctorModel.js';

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

export {changeAvailability}; 