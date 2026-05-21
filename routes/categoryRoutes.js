const express = require("express");
const router = express.Router();

const { getByCategory } = require("../controllers/categoryController");
const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category & Food Listing APIs
 */


/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories with foods
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */
router.get("/", verifyUser, getByCategory);

module.exports = router;