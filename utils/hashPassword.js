const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        // Define the salt rounds (higher means more secure but slower)
        const saltRounds = 5;
        // return await bcrypt.hash(password, saltRounds);
        return password;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
};

module.exports = { hashPassword };