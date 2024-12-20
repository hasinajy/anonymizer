const pool = require('../config/bd');

const canAuthenticate = async (email) => {
    const query = 'SELECT COUNT(*) as email_count FROM account WHERE email = $1 AND attempts > 0';
    const values = [email];

    try {   
        const result = await pool.query(query, values);
        return result.rows[0].email_count > 0;
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Unable to verify if the email can be authenticated');
    }
};

const resetAttempts = async (email) => {
    const query = 'Update account set attempts = 3 where email = $1 ';
    const values = [email];

    try {
        await pool.query(query, values);
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to reset attempts');
    }
}

module.exports = { canAuthenticate, resetAttempts };