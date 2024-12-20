const { getTokenFromHeaders, isValidToken } = require("../utils/tokenUtils");
const { sendResponse } = require("../utils/responseHandler"); 

const validateDeleteAccout = (req, res, next) => {
    const accountId = req.params.accountId;
    const token = getTokenFromHeaders(req);

    let errors = [];

    if(token == null){
        errors.push("Token required for this request");
    }
    
    if(!isValidToken(token)){
        errors.push("Token is not valid");
    }
    
    if (!accountId) {
       errors.push("Account ID is required.");
    }

    if (errors) {
        return sendResponse(res, 401, false, "Invalid data from request", {
            errors: errors,
        });
    }

    next();
};

module.exports = {
    validateDeleteAccout
 };
