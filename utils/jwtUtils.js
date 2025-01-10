const { sign } = require('jsonwebtoken');

const generateToken = async (user) => {
    // TODO: Update token expiry date
    const payload = { id: user.account_id, email: user.email };
    return sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.PIN_EXPIRY });
}

module.exports = {
    generateToken
}
