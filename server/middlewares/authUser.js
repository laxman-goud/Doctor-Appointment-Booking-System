import jwt from "jsonwebtoken";

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Login Again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        console.log("🔹 userId from token:", decoded.id);

        next();
    } catch (error) {
        console.error("JWT Verify Error:", error.message);
        res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};


export default authUser;
