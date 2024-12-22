const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit PIN
};

const validatePin = (storedPin, inputPin) => {
    return storedPin === inputPin;
}

const validatePinExpiry = (storedPin, pinExpiry, inputPin) => {
    const isPinValid = storedPin === inputPin;
    const currentDateTime = new Date();
    // Soustrait 3 heures pour correspondre à l'heure de la base de données
    currentDateTime.setHours(currentDateTime.getHours() - 3);
    const expiryDateTime = new Date(pinExpiry);
    const isPinExpired = currentDateTime > expiryDateTime;
    
    return isPinValid && !isPinExpired;
};

module.exports = { generatePin, validatePin, validatePinExpiry };
