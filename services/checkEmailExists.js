const pool = require('../config/bd');

const checkEmailExists = async (email) => {
    const query = 'SELECT COUNT(*) AS email_count FROM account WHERE email = $1';
    const values = [email];

    try {
        const result = await pool.query(query, values);
        return result.rows[0].email_count > 0;
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to check email');
    }
};

module.exports = checkEmailExists;