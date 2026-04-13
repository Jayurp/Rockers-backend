// Verify JWT token middleware
const jwt = require("jsonwebtoken");

const SECRET_KEY = "sample_secret_key";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyToken
}