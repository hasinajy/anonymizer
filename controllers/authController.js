const { sendResponse } = require("../utils/responseHandler");
const { isValidInformation } = require("../utils/validators");

const signup = async (req, res) => {
    const data = req.body;

    const errors = isValidInformation(data);
    if (errors) {
        sendResponse(res, 401, false, "Invalid data", {
            errors: errors 
        });
    }
    

    // TODO: Implement other functions
}