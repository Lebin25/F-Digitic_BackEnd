const express = require("express");
const {
   createBrand,
   updateBrand,
   deleteBrand,
   getBrand,
   getallBrand,
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API for managing brands
 */

/**
 * @swagger
 * /api/brand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the brand
 *             example:
 *               title: "New Brand"
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             example: {"title": "New Brand", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authMiddleware, isAdmin, createBrand);

/**
 * @swagger
 * /api/brand/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"title": "Updated Brand", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}
 */
router.put("/:id", authMiddleware, isAdmin, updateBrand);

/**
 * @swagger
 * /api/brand/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"message": "Brand deleted successfully"}
 */
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

/**
 * @swagger
 * /api/brand/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"title": "Brand 1", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}
 */
router.get("/:id", getBrand);

/**
 * @swagger
 * /api/brand:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"title": "Brand 1", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}]
 */
router.get("/", getallBrand);

module.exports = router;