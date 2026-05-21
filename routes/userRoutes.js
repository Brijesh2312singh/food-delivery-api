const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const { verifyUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Profile & Address APIs
 */


/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get User Profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", verifyUser, user.getProfile);


/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update User Profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.put("/update/:id", verifyUser, user.updateProfile);


/**
 * @swagger
 * /api/user/address/{id}:
 *   post:
 *     summary: Add Address
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.post("/address/:id", verifyUser, user.addAddress);


/**
 * @swagger
 * /api/user/address/{id}:
 *   delete:
 *     summary: Delete Address
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/address/:id", verifyUser, user.deleteAddress);


module.exports = router;