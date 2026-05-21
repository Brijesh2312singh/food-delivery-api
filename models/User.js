const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,

    // ✅ SAFE EMAIL (no duplicate null issue)
    email: {
        type: String,
        default: null,
        unique: false,
        sparse: true
    },

    password: String,

    // ✅ OTP LOGIN PRIMARY FIELD
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },

    otp: String,
    otpExpiry: Number,

    addresses: [
        {
            title: String,
            street: String,
            city: String,
            pincode: String,
            phone: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);