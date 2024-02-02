const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Upload Images
 *   description: API for managing product images
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload product images
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *           example:
 *             images: [binary_data_1, binary_data_2]
 *     responses:
 *       '200':
 *         description: Images successfully uploaded
 *       '401':
 *         description: Unauthorized - Missing or invalid token or user lacks admin privileges
 *       '500':
 *         description: Internal Server Error
 */
router.post("/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);

/**
 * @swagger
 * /api/upload/delete-img/{id}:
 *   delete:
 *     summary: Delete a product image by ID
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the image to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Image successfully deleted
 *       '401':
 *         description: Unauthorized - Missing or invalid token or user lacks admin privileges
 *       '404':
 *         description: Image not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;