const pool = require('../config/bd');

const canAuthenticate = async (email) => {
    const query = 'SELECT COUNT(*) as email_count FROM account WHERE email = $1 AND attempts > 0';
    const values = [email];

    try {   
        const result = await pool.query(query, values);
        return result.rows[0].email_count > 0;
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to check email');
    }
};

const resetAttempts = async (email) => {
    const query = 'Update account set attempts = 3 where email = $1 ';
    const values = [email];

    try {
        await pool.query(query, values);
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to check email');
    }
}


const deleteUser = async (email) => {
    const deleteAccountQuery = 'DELETE FROM account WHERE email = $1 RETURNING person_id';
    const deletePersonQuery = 'DELETE FROM person WHERE person_id = $1';
    const values = [email];

    try {
        const result = await pool.query(deleteAccountQuery, values);

        if (result.rowCount === 0) {
            throw new Error('No account found with the provided email');
        }

        const personId = result.rows[0].person_id;

        await pool.query(deletePersonQuery, [personId]);
        return { message: 'Account and associated person deleted successfully' };
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to delete account and person');
    }
};


module.exports = { canAuthenticate, resetAttempts , deleteUser }; 