const { sendResponse } = require("../utils/responseHandler");
const { addUser, updateEmailValidation } = require("../models/userModel");
const { sendSignUpValidation } = require('../services/emailService')

const signup = async (req, res) => {
    const { firstName, lastName, dateOfBirth, genderId, username, password, email } = req.body;

    try {
        // Create new user in the database
        const newUser = await addUser({
            firstName,
            lastName,
            dateOfBirth,
            genderId, 
            username,
            email,
            password
        });

        // Send confirmation email
        const confirmationLink = `https://localhost:5000/api/auth/signup/confirm/${newUser.personId}`; 
        const data = {
            "link": confirmationLink,
            "label": 'Validate Subscription'
        }

        await sendSignUpValidation(newUser.email, data)

        return sendResponse(res, 200, true, 'User created successfully, check your email to confirm.', null);
    } catch (error) {
        
        return sendResponse(res, 401, false, "Error while adding user", {
            errors : error
        });
    }
};

const validateSignUp = async (req, res) =>{
    const accountId = req.params.accountId;
    try{
        await updateEmailValidation(accountId);

        return sendResponse(res, 400, true, "Account validated successfully", null);
    }catch ( error){
        return sendResponse(res, 401, false, "Error while validating sign up", {
            errors : error
        });
    }
}

module.exports = {
    signup,
    validateSignUp
};
