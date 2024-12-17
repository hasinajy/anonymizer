const express = require("express");
const { signup } = require("../controllers/authControllers");
const { validateSignup } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/signup", validateSignup, signup);

module.exports = router;
