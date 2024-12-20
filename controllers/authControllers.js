const { sendResponse } = require("../utils/responseHandler");
const { addUser, updateEmailValidation, signIn, findByAccountId } = require("../models/userModel");
const { sendSignUpValidation } = require('../services/emailService')
const { resetAttempts } = require('../services/attemptsService');

const userModel = require('../models/userModel');
const { emailPin } = require('../services/emailService');
const { generatePin, validatePin, validatePinExpiry } = require('../utils/pinUtils');
const { generateToken } = require('../utils/jwtUtils');
const { use } = require("../routes/authRoutes");

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
            errors: error
        });
    }
};

const validateSignUp = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        await updateEmailValidation(accountId);

        return sendResponse(res, 400, true, "Account validated successfully", null);
    } catch (error) {
        return sendResponse(res, 401, false, "Error while validating sign up", {
            errors: error
        });
    }
}

const signInAccount = async (req, res) => {
    const { email, password } = req.body;

    try {
        const accountId = await signIn(email,password);

        if (accountId) {
            // 2. Generate PIN
            const generatedPin = generatePin();
            
            // 3. Send PIN to email
            await emailPin(email, generatedPin);
            await userModel.updatePin(email, generatedPin);

            return sendResponse(res, 200, true, 'PIN sent to email',null);
        }

    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, false, 'Internal server error', {
            errors : error
        });
    }
};

const validateSignInAccount = async (req, res) =>{
    const accountId = req.params.accountId;
    const { PIN } = req.body;

    try {

        let result = await findByAccountId(accountId);
        let users = result.rows;
        const user= users[0];
        const pinValidation = await validatePinExpiry(user.pin,user.expiration_date, PIN);
        console.log(pinValidation);
        if(pinValidation){
            await generateToken(user);
            await resetAttempts(user.email);
            generateTokenAccount(req,res);
        }else{
            await userModel.decrementAttempt(user.email);
            return sendResponse(res, 500, false, 'Internal server error', {
                errors : "PIN invalid or expired"
            });
        }
    } catch (error) {
    }
}

const generateTokenAccount = (req, res) => {
    sendResponse(res, 200, true, 'Token generated', { user: req.user });
};

const validateToken = (req, res) => {
    sendResponse(res, 200, true, 'Token is valid', { user: req.user });
};

module.exports = {
    signup,
    validateSignUp,
    signInAccount,
    validateToken,
    validateSignInAccount
};
