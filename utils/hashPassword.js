const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        // Define the salt rounds (higher means more secure but slower)
        // return await bcrypt.hash(password);
        return password;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
};

module.exports = { hashPassword };