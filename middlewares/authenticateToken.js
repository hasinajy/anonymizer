const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/responseHandler");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return sendResponse(res, 401, false, "No token provided");
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return sendResponse(res, 400, false, "Invalid token format");
    }

    const jwtToken = tokenParts[1];

    try {
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = payload; // Attaching user info to the request object
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return sendResponse(res, 401, false, "Sign-In token expired");
        }
        return sendResponse(res, 403, false, "Invalid token");
    }
};

module.exports = {
    authenticateToken
};
