const express = require("express");
const { deleteAccount, updateAccount, updateAccountPassword } = require("../controllers/accountController");
const { validateDeleteAccount, validateUpdateAccount, validateUpdatePasswordAccount } = require("../middlewares/accountMiddlewares");

const router = express.Router();

/**
 * @swagger
 * /api/accounts/{accountId}:
 *   delete:
 *     summary: Delete an account
 *     description: Endpoint to delete a user account.
 *     tags:
 *       - Account
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: Unique identifier for the user account to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Account deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Account deleted successfully"
 *       '400':
 *         description: Invalid account ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid account ID"
 *       '404':
 *         description: Account not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Account not found"
 */
router.delete("/accounts/:accountId", validateDeleteAccount, deleteAccount);

/**
 * @swagger
 * /api/accounts/{accountId}:
 *   put:
 *     summary: Update an account
 *     description: Endpoint to update user account details.
 *     tags:
 *       - Account
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: Unique identifier for the user account to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *     responses:
 *       '200':
 *         description: Account updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Account updated successfully"
 *       '400':
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       '404':
 *         description: Account not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Account not found"
 */
router.put("/accounts/:accountId", validateUpdateAccount, updateAccount);

/**
 * @swagger
 * /api/accounts/{accountId}/password:
 *   put:
 *     summary: Update account password
 *     description: Endpoint to update the password of a user account.
 *     tags:
 *       - Account
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: Unique identifier for the user account.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 description: Current password of the user.
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: New password for the account.
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       '200':
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *       '400':
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       '404':
 *         description: Account not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Account not found"
 */
router.put("/accounts/:accountId/password", validateUpdatePasswordAccount, updateAccountPassword);

module.exports = router;