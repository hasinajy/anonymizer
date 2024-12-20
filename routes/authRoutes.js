const express = require("express");
const { signup, validateSignUp, signIn, validateToken } = require("../controllers/authControllers");
const { validateSignup, authenticateToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.get("/signup/:accountId", validateSignUp);
router.post('/signin', signIn);
router.get('/validate-token', authenticateToken, validateToken);

module.exports = router;
