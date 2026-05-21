const express = require("express");
const router = express.Router();

const {
    sendOTP,
    verifyOTP,
    resetPassword
} = require("../controllers/otpController");

const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: OTP & Password Reset APIs
 */


/**
 * @swagger
 * /api/otp/send-otp:
 *   post:
 *     summary: Send OTP to user phone
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post("/send-otp", sendOTP); // ❌ no auth


/**
 * @swagger
 * /api/otp/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
router.post("/verify-otp", verifyOTP); // ❌ no auth


/**
 * @swagger
 * /api/otp/reset-password:
 *   post:
 *     summary: Reset Password using OTP
 *     tags: [OTP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post("/reset-password", verifyUser, resetPassword);

module.exports = router;