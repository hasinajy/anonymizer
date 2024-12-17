const { isValidInformation } = require("../utils/validators");

const validateSignup = (req, res, next) => {
    const data = req.body;
    const errors = isValidInformation(data);

    if (errors) {
        return sendResponse(res, 401, false, "Invalid data", {
            errors: errors,
        });
    }

    // TODO: Implement more validations if needed

    next();
};

module.exports = { validateSignup };
