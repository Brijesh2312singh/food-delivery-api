const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

/**
 * ======================
 * AUTH TAG
 * ======================
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * ======================
 * SIGNUP API
 * ======================
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User Signup
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phoneNumber
 *             properties:
 *               name:
 *                 type: string
 *                 example: Brijesh
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phoneNumber:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/signup", signup);

/**
 * ======================
 * LOGIN API
 * ======================
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful (JWT token returned)
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

module.exports = router;