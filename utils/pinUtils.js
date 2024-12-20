const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit PIN
};

const validatePin = (storedPin, inputPin) => {
    return storedPin === inputPin;
}

const validatePinExpiry = (storedPin, pinExpiry, inputPin) => {
    const isPinValid = storedPin === inputPin;
    const isPinExpired = Date.now() > pinExpiry;

    return isPinValid && !isPinExpired;
};

export { generatePin, validatePin, validatePinExpiry };
