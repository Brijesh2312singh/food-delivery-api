const Order = require("../models/Order");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");


// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, amount } = req.body;

        if (!userId || !items || !amount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Razorpay order create
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_rcpt_" + Date.now()
        };

        let razorOrder;
        try {
            razorOrder = await razorpay.orders.create(options);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Razorpay order creation failed",
                error: err.message
            });
        }

        // Save in DB (REAL ORDER)
        const order = new Order({
            userId,
            items,
            totalAmount: amount,
            razorpayOrderId: razorOrder.id,
            status: "Placed",
            timeline: [
                {
                    status: "Placed",
                    time: new Date()
                }
            ]
        });

        await order.save();

        return res.json({
            success: true,
            message: "Order created successfully",
            razorpayOrder: razorOrder,
            orderId: order._id   // IMPORTANT
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing payment details"
            });
        }

        // Signature verification
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
        }

        // Find order
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Prevent duplicate verification
        if (order.status === "Confirmed") {
            return res.json({
                success: true,
                message: "Payment already verified",
                order
            });
        }

        // Update order
        order.status = "Confirmed";
        order.razorpayPaymentId = razorpay_payment_id;

        order.timeline.push({
            status: "Confirmed",
            time: new Date()
        });

        await order.save();

        return res.json({
            success: true,
            message: "Payment verified successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};