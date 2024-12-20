const express = require("express");
const { signup, validateSignUp } = require("../controllers/authControllers");
const { validateSignup } = require("../middlewares/authMiddlewares");

const router = express.Router();
router.post("/signup", validateSignup, signup);
router.get("/signup/:accountId", validateSignUp);

module.exports = router;
