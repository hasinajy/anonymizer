const { sendResponse } = require("../utils/responseHandler");
const { deleteUser, updateUser, updatePasword } = require("../models/userModel");

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

const updateAccount = async (req, res) =>{
    const accountId = req.params.accountId;
    const { newUsername } = req.body;

    try {
        await updateUser({ 
            accountId, 
            newUsername
        })

        return sendResponse(res, 200, true, 'Username updated successfully.', null);
    } catch (error) {
        return sendResponse(res, 401, false, "Error while updating username", {
            errors : error
        })
    }
}

const updateAccountPassword = async (req, res) =>{
    const accountId = req.params.accountId;
    const { newPassword } = req.body;

    try {
        await updatePasword({ 
            accountId, 
            newPassword
        })

        return sendResponse(res, 200, true, 'Password updated successfully.', null);
    } catch (error) {
        return sendResponse(res, 401, false, "Error while updating password", {
            errors : error
        })
    }
}


module.exports = {
    deleteAccount,
    updateAccount
}