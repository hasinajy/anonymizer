const { sendResponse } = require("../utils/responseHandler");
const { isValidInformation } = require("../utils/validators");

const userModel = require('../models/userModel');
const { emailPin } = require('../services/emailService');
const { generatePin, validatePin, validatePinExpiry } = require('../utils/pinUtils');
const { generateToken } = require('../utils/jwtUtils');

const signup = async (req, res) => {
    const { username, name, password, passwordConf, email } = req.body;

    // TODO: Call functions to signup
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
    signIn
}