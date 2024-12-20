const express = require("express");
const { deleteAccount } = require("../controllers/accountController");

const router = express.Router();
router.delete("/accounts/:accountId", deleteAccount);

module.exports = router;
