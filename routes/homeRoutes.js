const express = require("express");
const router = express.Router();

const { getHomeData } = require("../controllers/homeController");
const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home Screen APIs
 */


/**
 * @swagger
 * /api/home:
 *   get:
 *     summary: Get Home Screen Data (Banners, Restaurants, Categories, Foods)
 *     tags: [Home]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home data fetched successfully
 */
router.get("/", verifyUser, getHomeData);

module.exports = router;