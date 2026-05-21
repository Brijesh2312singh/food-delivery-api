const express = require("express");
const router = express.Router();

const { getRestaurantDetails } = require("../controllers/restaurantController");
const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Restaurant
 *   description: Restaurant APIs
 */


/**
 * @swagger
 * /api/restaurant/{id}:
 *   get:
 *     summary: Get Restaurant Details with Food Items
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant details fetched successfully
 */
router.get("/:id", verifyUser, getRestaurantDetails);

module.exports = router;