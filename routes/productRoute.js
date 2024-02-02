const express = require("express");
const {
   createProduct,
   getaProduct,
   getAllProduct,
   updateProduct,
   deleteProduct,
   addToWishlist,
   rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", authMiddleware, isAdmin, createProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", getaProduct);

/**
 * @swagger
 * /api/product/wishlist:
 *   put:
 *     summary: Add to wishlist
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Added to wishlist successfully
 */
router.put("/wishlist", authMiddleware, addToWishlist);

/**
 * @swagger
 * /api/product/rating:
 *   put:
 *     summary: Update product rating
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Rating updated successfully
 */
router.put("/rating", authMiddleware, rating);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a specific product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", authMiddleware, isAdmin, updateProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a specific product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", getAllProduct);

module.exports = router;