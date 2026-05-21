const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // ❌ No token
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No token provided"
            });
        }

        // ✅ Format: Bearer token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Attach user data
        req.user = decoded;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};