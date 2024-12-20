const express = require("express");
const { deleteAccount, updateAccount, updateAccountPassword } = require("../controllers/accountController");
const { validateDeleteAccount, validateUpdateAccount, validateUpdatePasswordAccount } = require("../middlewares/accountMiddlewares");


const router = express.Router();
router.delete("/accounts/:accountId",validateDeleteAccount, deleteAccount);
router.put("/accounts/:accountId",validateUpdateAccount, updateAccount);
router.put("/accounts/:accountId/password",validateUpdatePasswordAccount, updateAccountPassword);

module.exports = router;
