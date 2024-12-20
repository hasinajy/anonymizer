const { sendResponse } = require("../utils/responseHandler");
const { deleteUser } = require("../models/userModel");

const deleteAccount = async (req, res) =>{
    const accountId = req.params.accountId;

    try {
        
        await deleteUser(accountId);

        return sendResponse(res, 200, true, 'Account deleted successfully.', null);
    } catch (error) {
        return sendResponse(res, 401, false, "Error while deleting account", {
            errors : error
        });
    }
}

module.exports = {
    deleteAccount
}