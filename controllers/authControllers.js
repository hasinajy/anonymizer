const { sendResponse } = require("../utils/responseHandler");
const { isValidInformation } = require("../utils/validators");

const userModel = require('../models/userModel');
const emailService = require('../services/emailService');
const { generatePin, validatePinExpiry } = require('../utils/pinUtils');
const { generateToken } = require('../utils/jwtUtils');

const signup = async (req, res) => {
    const { username, name, password, passwordConf, email } = req.body;

    // TODO: Call functions to signup
}

const signIn = async (req, res) => {
    const { email, pin } = req.body;

    try {
        // 1. Validate email
        const user = await userModel.findByEmail(email);

        if (!user) {
            return sendResponse(res, 404, false, 'Email is not registered');
        }

        if (!pin) {
            // 2. Generate PIN
            const generatedPin = generatePin();
            await userModel.updatePin(email, generatedPin);

            // 3. Send PIN to email
            await emailService.sendPin(email, generatedPin);
            return sendResponse(res, 200, true, 'PIN sent to email');
        }

        // 4. Validate PIN
        const isValid = await validatePinExpiry(user.pin, user.pinExpiry, pin);

        if (!isValid) {
            return sendResponse(res, 400, false, 'Invalid or expired PIN');
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