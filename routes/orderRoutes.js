const express = require("express");
const router = express.Router();

const { createOrder, verifyPayment } = require("../controllers/orderController");
const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order & Payment APIs
 */


/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create Order (Razorpay Order Generate)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     foodId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order created successfully
 */
router.post("/", verifyUser, createOrder);


/**
 * @swagger
 * /api/order/verify-payment:
 *   post:
 *     summary: Verify Razorpay Payment
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 */
router.post("/verify-payment", verifyUser, verifyPayment);


module.exports = router;