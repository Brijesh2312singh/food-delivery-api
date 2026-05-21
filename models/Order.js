const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [
        {
            foodId: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ],

    totalAmount: Number,

    address: {
        title: String,
        street: String,
        city: String,
        pincode: String,
        phone: String
    },

    // 🚀 ORDER STATUS (TRACKING)
    status: {
        type: String,
        enum: [
            "Placed",
            "Confirmed",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Placed"
    },

    // 📍 TIMELINE FOR TRACKING
    timeline: [
        {
            status: String,
            time: {
                type: Date,
                default: Date.now
            }
        }
    ],

    // 💳 RAZORPAY FIELDS (IMPORTANT)
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    paymentMethod: {
        type: String,
        default: "razorpay"
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);