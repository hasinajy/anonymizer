const express = require("express");
const { signup, validateSignUp, signInAccount, validateToken , validateSignInAccount} = require("../controllers/authControllers");
const { validateSignup,validateSignIn  } = require("../middlewares/authMiddlewares");
const { authenticateToken } = require("../middlewares/authenticateToken")

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

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: User Sign-in
 *     description: Authenticates a user by validating their email and PIN. If no PIN is provided, a new PIN is generated and sent to the user's email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               pin:
 *                 type: string
 *                 description: PIN for authentication (optional). If omitted, a new PIN will be sent to the email.
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Success. Returns a message or a JWT token depending on the operation.
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
 *                   example: "Authentication successful" # Example for successful login.
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Validation or PIN-related errors.
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
 *                   example: "Invalid PIN. Please input the one sent to your email."
 *       '404':
 *         description: Email not registered.
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
 *                   example: "Email is not registered"
 *       '500':
 *         description: Internal server error.
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
 *                   example: "Internal server error"
 */
router.post("/signin", signIn);

/**
 * @swagger
 * /api/auth/validate-token:
 *   get:
 *     summary: Validate JWT token
 *     description: Checks the validity of the provided JWT token and returns user information if valid.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Token is valid.
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
 *                   example: "Token is valid"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: Information extracted from the token payload.
 *       '400':
 *         description: Invalid token format.
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
 *                   example: "Invalid token format"
 *       '401':
 *         description: No token provided or token expired.
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
 *                   example: "No token provided" # Example for missing token.
 *       '403':
 *         description: Invalid token.
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
 *                   example: "Invalid token"
 */
router.get("/validate-token", authenticateToken, validateToken);

module.exports = router;
