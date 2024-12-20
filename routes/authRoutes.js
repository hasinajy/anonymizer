const express = require("express");
const { signup, validateSignUp, signIn } = require("../controllers/authControllers");
const { validateSignup } = require("../middlewares/authMiddlewares");

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     description: Endpoint to register a new user. Validates input data and sends a confirmation email upon successful signup.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - genderId
 *               - username
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: User's date of birth in YYYY-MM-DD format.
 *               genderId:
 *                 type: integer
 *                 description: User's gender ID.
 *               username:
 *                 type: string
 *                 description: Desired username.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the account.
 *     responses:
 *       '200':
 *         description: User successfully created.
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
 *                   example: "User created successfully, check your email to confirm."
 *                 data:
 *                   type: object
 *                   nullable: true
 *       '401':
 *         description: Invalid input or error during signup.
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
 *                   example: "Invalid data"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Email not available"
 *     security:
 *       - bearerAuth: []
 */
router.post("/signup", validateSignup, signup);

/**
 * @swagger
 * /api/auth/signup/{accountId}:
 *   get:
 *     summary: Validate user signup
 *     description: Endpoint to validate a user account using the account ID.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: Unique identifier for the user account to be validated.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Account validated successfully.
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
 *                   example: "Account validated successfully"
 *                 data:
 *                   type: object
 *                   nullable: true
 *       '401':
 *         description: Error occurred during validation.
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
 *                   example: "Error while validating sign up"
 *                 errors:
 *                   type: object
 *                   additionalProperties: true
 */
router.get("/signup/:accountId", validateSignUp);

router.post('/signin', signIn);

module.exports = router;
