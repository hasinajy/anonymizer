const express = require("express");
const { signup, signIn } = require("../controllers/authControllers");
const { validateSignup } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post('/signin', signIn);

module.exports = router;
