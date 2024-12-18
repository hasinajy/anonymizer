const jwt = require("jsonwebtoken");

const isValidToken = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {
    isValidToken
}