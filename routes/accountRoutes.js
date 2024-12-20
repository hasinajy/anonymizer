const express = require("express");
const { deleteAccount } = require("../controllers/accountController");
const { updateAccount } = require("../controllers/accountController");
const { validateDeleteAccount, validateUpdateAccount } = require("../middlewares/accountMiddlewares");


const router = express.Router();
router.delete("/accounts/:accountId",validateDeleteAccount, deleteAccount);
router.put("/accounts/:accountId",validateUpdateAccount, updateAccount);

module.exports = router;
