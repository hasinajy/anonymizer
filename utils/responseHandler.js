const sendResponse = (res, status, success, message, data = null) => {
    res.status(status).json({
        status,
        success,
        message,
        data,
    });
};

module.exports = { sendResponse };
