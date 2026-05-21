const express = require("express");
const router = express.Router();

const { search } = require("../controllers/searchController");
const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search APIs (Food / Restaurant)
 */


/**
 * @swagger
 * /api/search/search:
 *   get:
 *     summary: Search food or restaurant
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: Search keyword (food name or restaurant)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results fetched successfully
 */
router.get("/search", verifyUser, search);

module.exports = router;