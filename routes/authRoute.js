const express = require("express");
const {
   createUser,
   loginUserCtrl,
   getallUser,
   getaUser,
   deleteaUser,
   updatedUser,
   blockUser,
   unblockUser,
   handleRefreshToken,
   logout,
   updatePassword,
   forgotPasswordToken,
   resetPassword,
   loginAdmin,
   getWishlist,
   saveAddress,
   userCart,
   getUserCart,
   createOrder,
   getMyOrders,
   removeProductFromCart,
   updateProductQuantityFromCart,
   getMonthWiseOrderIncome,
   getYearlyTotalOrders,
   getAllOrders,
   getSingleOrder,
   updateOrder,
   emptyCart,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for user authentication and authorization
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example: {"message": "User registered successfully"}
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", createUser);

/**
 * @swagger
 * /api/user/forgot-password-token:
 *   post:
 *     summary: Request a password reset token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *             example:
 *               email: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset token sent successfully
 *         content:
 *           application/json:
 *             example: {"message": "Password reset token sent successfully"}
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: User not found with the provided email
 *       500:
 *         description: Internal Server Error
 */
router.post("/forgot-password-token", forgotPasswordToken);

/**
 * @swagger
 * /api/user/reset-password/{token}:
 *   put:
 *     summary: Reset user's password using the provided token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Password reset token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *             example:
 *               newPassword: "newPassword123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             example: {"message": "Password reset successful"}
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Invalid or expired password reset token
 *       500:
 *         description: Internal Server Error
 */
router.put("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /api/user/password:
 *   put:
 *     summary: Update user's password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Current password of the user
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *             example:
 *               oldPassword: "currentPassword123"
 *               newPassword: "newPassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Password updated successfully"}
 *       400:
 *         description: Bad request - Invalid input data or old password
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.put("/password", authMiddleware, updatePassword);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               email: "user@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example: {"token": "Bearer eyJhbGciOiJIUzI1NiIsIn..."}

 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", loginUserCtrl);

/**
 * @swagger
 * /api/user/admin-login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address
 *               password:
 *                 type: string
 *                 description: Admin's password
 *             example:
 *               email: "admin@example.com"
 *               password: "adminPassword123"
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             example: {"token": "Bearer eyJhbGciOiJIUzI1NiIsIn..."}

 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post("/admin-login", loginAdmin);

/**
 * @swagger
 * /api/user/cart:
 *   post:
 *     summary: Add products to user's cart
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CartItem"
 *     responses:
 *       200:
 *         description: Products added to the cart successfully
 *         content:
 *           application/json:
 *             example: {"message": "Products added to the cart successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post("/cart", authMiddleware, userCart);

/**
 * @swagger
 * /api/user/order/checkout:
 *   post:
 *     summary: Process checkout for user's cart
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Checkout"
 *     responses:
 *       200:
 *         description: Checkout successful
 *         content:
 *           application/json:
 *             example: {"message": "Checkout successful"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post("/order/checkout", authMiddleware, checkout);

/**
 * @swagger
 * /api/user/order/paymentVerification:
 *   post:
 *     summary: Verify payment for user's order
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PaymentVerification"
 *     responses:
 *       200:
 *         description: Payment verification successful
 *         content:
 *           application/json:
 *             example: {"message": "Payment verification successful"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);

/**
 * @swagger
 * /api/user/cart/create-order:
 *   post:
 *     summary: Create an order from the user's cart
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateOrder"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example: {"orderId": "123", "status": "pending", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post("/cart/create-order", authMiddleware, createOrder);

/**
 * @swagger
 * /api/user/all-users:
 *   get:
 *     summary: Get all users (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"firstname": "John", "lastname": "Doe", "email": "john@example.com", "role": "user", "isBlocked": false, "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       500:
 *         description: Internal Server Error
 */
router.get("/all-users", getallUser);

/**
 * @swagger
 * /api/user/getmyorders:
 *   get:
 *     summary: Get orders for the authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"orderId": "123", "status": "completed", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get("/getmyorders", authMiddleware, getMyOrders);

/**
 * @swagger
 * /api/user/getallorders:
 *   get:
 *     summary: Get all orders (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"orderId": "123", "status": "completed", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       500:
 *         description: Internal Server Error
 */
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);

/**
 * @swagger
 * /api/user/getOrder/{id}:
 *   get:
 *     summary: Get a single order by ID (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"orderId": "123", "status": "completed", "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       404:
 *         description: Order not found with the provided ID
 *       500:
 *         description: Internal Server Error
 */
router.get("/getOrder/:id", authMiddleware, isAdmin, getSingleOrder);

/**
 * @swagger
 * /api/user/getMonthWiseOrderIncome:
 *   get:
 *     summary: Get monthly order income (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"month": "January", "totalIncome": 5000}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       500:
 *         description: Internal Server Error
 */
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);

/**
 * @swagger
 * /api/user/getyearlyorders:
 *   get:
 *     summary: Get yearly total orders (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"year": 2023, "totalOrders": 100}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       500:
 *         description: Internal Server Error
 */
router.get("/getyearlyorders", authMiddleware, getYearlyTotalOrders);

/**
 * @swagger
 * /api/user/refresh:
 *   get:
 *     summary: Refresh the user's access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"token": "Bearer eyJhbGciOiJIUzI1NiIsIn..."}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get("/refresh", handleRefreshToken);

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: Logout the user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"message": "Logout successful"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get("/logout", logout);

/**
 * @swagger
 * /api/user/wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"productId": "123", "name": "Product 1", "price": 50}]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get("/wishlist", authMiddleware, getWishlist);

/**
 * @swagger
 * /api/user/cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"productId": "123", "name": "Product 1", "price": 50, "quantity": 2}]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get("/cart", authMiddleware, getUserCart);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"firstname": "John", "lastname": "Doe", "email": "john@example.com", "role": "user", "isBlocked": false, "createdAt": "2024-02-01T12:00:00.000Z", "updatedAt": "2024-02-01T12:00:00.000Z"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       404:
 *         description: User not found with the provided ID
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", authMiddleware, isAdmin, getaUser);

/**
 * @swagger
 * /api/user/delete-product-cart/{cartItemId}:
 *   delete:
 *     summary: Remove a product from the user's cart
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: ID of the cart item to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully
 *         content:
 *           application/json:
 *             example: {"message": "Product removed from the cart successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);

/**
 * @swagger
 * /api/user/update-product-cart/{cartItemId}/{newQuantity}:
 *   delete:
 *     summary: Update the quantity of a product in the user's cart
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: ID of the cart item to update
 *         schema:
 *           type: string
 *       - in: path
 *         name: newQuantity
 *         required: true
 *         description: New quantity for the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Product quantity updated successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);

/**
 * @swagger
 * /api/user/empty-cart:
 *   delete:
 *     summary: Empty the user's cart
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart emptied successfully
 *         content:
 *           application/json:
 *             example: {"message": "Cart emptied successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.delete("/empty-cart", authMiddleware, emptyCart);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example: {"message": "User deleted successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       404:
 *         description: User not found with the provided ID
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", deleteaUser);

/**
 * @swagger
 * /api/user/updateOrder/{id}:
 *   put:
 *     summary: Update the status of an order (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status for the order
 *             example:
 *               status: "completed"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Order status updated successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       404:
 *         description: Order not found with the provided ID
 *       500:
 *         description: Internal Server Error
 */
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);

/**
 * @swagger
 * /api/user/edit-user:
 *   put:
 *     summary: Edit the user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/EditUser"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "User profile updated successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.put("/edit-user", authMiddleware, updatedUser);

/**
 * @swagger
 * /api/user/save-address:
 *   put:
 *     summary: Save the user's address
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               address:
 *                 type: string
 *                 description: User's address
 *             example:
 *               address: "123 Main Street, City, Country"
 *     responses:
 *       200:
 *         description: Address saved successfully
 *         content:
 *           application/json:
 *             example: {"message": "Address saved successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.put("/save-address", authMiddleware, saveAddress);

/**
 * @swagger
 * /api/user/block-user/{id}:
 *   put:
 *     summary: Block a user by ID (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to block
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             example: {"message": "User blocked successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       404:
 *         description: User not found with the provided ID
 *       500:
 *         description: Internal Server Error
 */
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);

/**
 * @swagger
 * /api/user/unblock-user/{id}:
 *   put:
 *     summary: Unblock a user by ID (admin-only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to unblock
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *         content:
 *           application/json:
 *             example: {"message": "User unblocked successfully"}
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User does not have admin privileges
 *       404:
 *         description: User not found with the provided ID
 *       500:
 *         description: Internal Server Error
 */
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;