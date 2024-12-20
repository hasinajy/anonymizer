const { isValidInformation } = require("../utils/validators");
const { sendResponse } = require("../utils/responseHandler");
const EmailUtils = require("../utils/emailUtils"); 

const validateSignup = (req, res, next) => {
    const data = req.body;
    const errors = isValidInformation(data);
    
    // Check if the email is available
    if (!EmailUtils.isEmailAvailable(data.email)) {
        errors.push("Email not available");
    }

    if (errors) {
        return sendResponse(res, 401, false, "Invalid data", {
            errors: errors,
        });
    }
    // TODO: Implement more validations if needed

    next();
};

module.exports = { validateSignup };
