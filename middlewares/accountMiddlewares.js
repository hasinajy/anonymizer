const { getTokenFromHeaders, isValidToken } = require("../utils/tokenUtils");
const { sendResponse } = require("../utils/responseHandler");
const { isValidUsername } = require("../utils/validators");

const validateDeleteAccount = (req, res, next) => {
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


    if (errors.length > 1) {
        return sendResponse(res, 401, false, "Invalid data from request", {
            errors: errors,
        });
    }

    next();
};

const validateUpdateAccount = (req, res, next) => {
    const accountId = req.params.accountId;
    const { newUsername }= req.body;
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

    if(!isValidUsername(newUsername)){
        errors.push("Format not valid for username")
    }

    if (errors.length > 0) {
        return sendResponse(res, 401, false, "Invalid data from request", {
            errors: errors,
        });
    }

    next();
};

const validateUpdatePasswordAccount = (req, res, next) => {
    const accountId = req.params.accountId;
    const { newPassword }= req.body;
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

    if(!isValidPassword(newPassword)){
        errors.push("Format not valid for username")
    }

    if (errors) {
        return sendResponse(res, 401, false, "Invalid data from request", {
            errors: errors,
        });
    }

    next();
};

module.exports = {
    validateDeleteAccount,
    validateUpdateAccount,
    validateUpdatePasswordAccount
 };
