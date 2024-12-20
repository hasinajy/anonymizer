const express = require("express");
const { deleteAccount } = require("../controllers/accountController");
const { validateDeleteAccout } = require("../middlewares/accountMiddlewares");


const router = express.Router();
router.delete("/accounts/:accountId",validateDeleteAccout, deleteAccount);

module.exports = router;
