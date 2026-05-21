const router = require("express").Router();
const cart = require("../controllers/cartController");
const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart Management APIs
 */


/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
router.post("/add", verifyUser, cart.addToCart);


/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:userId", verifyUser, cart.getCart);


/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
router.post("/remove", verifyUser, cart.removeItem);


module.exports = router;