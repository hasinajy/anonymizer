const jwt = require("jsonwebtoken");

const isValidToken = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};

const getTokenFromHeaders = (req) => {
    const authHeader = req.headers['authorization']; 
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1]; 
    }
    return null;
};

module.exports = {
    isValidToken, 
    getTokenFromHeaders
}