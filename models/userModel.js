const pool = require('../config/bd');
const { hashPassword } = require('../utils/hashPassword');

const updatePaswword = async (email, password) => {
    const query = 'Update account set password = $1 where email = $2';
    const values = [email, hashPassword(password)];
    try {
        await pool.query(query, values);
    } catch (error) {
        console.log('Error for updating password ');
        throw new Error('Faild to update password ');
    }
};

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

const updateUser = async (user) => {
    const { email, username, password, attempts, pin, expiration_date } = user;

    if (!email) {
        throw new Error('Email is required to update the account');
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (username) {
        fields.push(`username = $${index++}`);
        values.push(username);
    }
    if (password) {
        fields.push(`password = $${index++}`);
        values.push(password);
    }
    if (attempts !== undefined) {
        fields.push(`attempts = $${index++}`);
        values.push(attempts);
    }
    if (pin) {
        fields.push(`pin = $${index++}`);
        values.push(pin);
    }
    if (expiration_date) {
        fields.push(`expiration_date = $${index++}`);
        values.push(expiration_date);
    }

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    // Add the email for the WHERE clause
    values.push(email);

    const query = `UPDATE account SET ${fields.join(', ')} WHERE email = $${index}`;

    try {
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            throw new Error('No account found with the provided email');
        }

        return { message: 'Account updated successfully' };
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to update account');
    }
};

const findByEmail = async (email) => {
    const query = 'select * from account where email = $1';
    return await pool.query(query, [email]);
};

const updatePin = async (email, pin) => {
    const query = 'update account set expiration_date = $1 where email = $2';
    const pinExpiry = Date.now() + 90 * 1000; // 90 seconds expiry
    return await pool.query(query, [pinExpiry, email]);
};

const decrementAttempt = async (email) => {
    const user = findByEmail(email);

    if (user.attempts == 0) {
        throw new Error('You have reached the maximum number of attempts.')
    }

    const query = 'update account set attempts = attempts - 1 where email = $1';
    return pool.query(query, [email]);
}

// SIGN UP

const addUser = async (user) => {
    const { firstName, lastName, dateOfBirth, genderId, username, email, password } = user;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const personInsertQuery = `
            INSERT INTO person (first_name, last_name, date_of_birth, gender_id)
            VALUES ($1, $2, $3, $4) RETURNING person_id;
        `;
        const personResult = await client.query(personInsertQuery, [firstName, lastName, dateOfBirth, genderId]);
        const personId = personResult.rows[0].person_id;

        const accountInsertQuery = `
            INSERT INTO account (person_id, username, email, password)
            VALUES ($1, $2, $3, $4);
        `;
        await client.query(accountInsertQuery, [personId, username, email, password]);

        await client.query('COMMIT');

        return {
            personId,
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const updateEmailValidation = async (accountId) => {
    try {
        const query = `UPDATE account SET is_validated = true WHERE account_id = $1 AND is_validated = false;`
        const result = await pool.query(query, [accountId]);

        // Check if a row was updated
        return result.rowCount > 0;
    } catch (error) {
        throw error;
    }
};

export { updatePaswword, deleteUser, updateUser, findByEmail, updatePin, decrementAttempt, addUser, updateEmailValidation }; 
