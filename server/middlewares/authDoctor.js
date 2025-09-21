import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const dtoken = req.headers.dtoken;
        if (!dtoken) {
            return res.status(401).json({ message: "Unauthorized. Login Again." });
        }

        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};


export default authDoctor;
