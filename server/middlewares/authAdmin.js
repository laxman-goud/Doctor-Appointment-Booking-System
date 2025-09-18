import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Login Again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ message: "Unauthorized. Invalid token." });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

export default authAdmin;
