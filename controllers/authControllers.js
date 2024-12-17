const { sendResponse } = require("../utils/responseHandler");
const { isValidInformation } = require("../utils/validators");

const signup = async (req, res) => {
    const { username, name, password, passwordConf, email } = req.body;

    // TODO: Call functions to signup
}

module.exports = {
    signup
}