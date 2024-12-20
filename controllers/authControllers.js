const { sendResponse } = require("../utils/responseHandler");
const { addUser, updateEmailValidation } = require("../models/userModel");
const { sendSignUpValidation } = require('../services/emailService')

const userModel = require('../models/userModel');
const { emailPin } = require('../services/emailService');
const { generatePin, validatePin, validatePinExpiry } = require('../utils/pinUtils');
const { generateToken } = require('../utils/jwtUtils');

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
        const confirmationLink = `https://localhost:5000/api/auth/signup/${newUser.personId}`; 
        const data = {
            "link": confirmationLink,
            "label": 'Validate Subscription'
        }
        console.log(email);
        await sendSignUpValidation(email, data)

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

const signIn = async (req, res) => {
    const { email, pin } = req.body;

    try {
        // 1. Validate email
        let user = await userModel.findByEmail(email);

        if (!user) {
            return sendResponse(res, 404, false, 'Email is not registered');
        }

        if (!pin) {
            // 2. Generate PIN
            const generatedPin = generatePin();
            await userModel.updatePin(email, generatedPin);

            // 3. Send PIN to email
            await emailPin(email, generatedPin);
            return sendResponse(res, 200, true, 'PIN sent to email');
        }

        // 4. Validate PIN
        user = await userModel.findByEmail(email);

        // Handle invalid pin
        const isValid = validatePin(user.pin, pin);

        if (!isValid) {
            try {
                await userModel.decrementAttempt(email);
            } catch (error) {
                return sendResponse(res, 400, false, error.message);
            }

            return sendResponse(res, 400, false, 'Invalid PIN. Please input the one sent to your email.');
        }

        // Handle pin expiry
        const isPinExpired = validatePinExpiry(user.pin, user.expiration_date, pin);

        if (isPinExpired) {
            return sendResponse(res, 400, false, 'Expired PIN. Please request a new one.');
        }

        // 5. Generate and send JWT token
        const token = generateToken(user);
        return sendResponse(res, 200, true, 'Authentication successful', { token });
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, false, 'Internal server error');
    }
};

module.exports = {
    signup,
    validateSignUp,
    signIn
};
