const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= SEND OTP =================
exports.sendOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Phone number required"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

        let user = await User.findOne({ phoneNumber });

        if (!user) {
            user = new User({ phoneNumber });
        }

        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();

        console.log("OTP Sent:", otp); // debug

        return res.json({
    success: true,
    message: "OTP Sent Successfully",
    otp: otp   // ✅ ADD THIS
});

    } catch (error) {
        console.log("SEND OTP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= VERIFY OTP =================
exports.verifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        if (!phoneNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: "Phone number and OTP required"
            });
        }

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        }

        // clear OTP after success
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        return res.json({
            success: true,
            message: "OTP Verified Successfully"
        });

    } catch (error) {
        console.log("VERIFY OTP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
    try {
        const { phoneNumber, otp, newPassword } = req.body;

        if (!phoneNumber || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        // clear OTP
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        return res.json({
            success: true,
            message: "Password Reset Successful"
        });

    } catch (error) {
        console.log("RESET PASSWORD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};