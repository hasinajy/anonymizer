const express = require("express");
const { signup, validateSignUp, signInAccount, validateToken } = require("../controllers/authControllers");
const { validateSignup,validateSignIn  } = require("../middlewares/authMiddlewares");
// const { authenticateToken } = require("../middlewares/authenticateToken")

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.get("/signup/:accountId", validateSignUp);
router.post('/signin', validateSignIn, signInAccount);
// router.get('/validate-token', authenticateToken, validateToken);

module.exports = router;
