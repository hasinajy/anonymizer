const { sendResponse } = require("../utils/responseHandler");
const { deleteUser } = require("../models/userModel");

const deleteUser = async (req, res) =>{
    const { email } = req.body;

    try {
        deleteUser(email);

        return sendResponse(res, 200, true, 'Account deleted successfully.', null);
    } catch (error) {
        return sendResponse(res, 401, false, "Error while deleting account", {
            errors : error
        });
    }
}

module.exports = {
    deleteUser
}