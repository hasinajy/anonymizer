const pool = require('../config/bd');
const { hashPassword } = require('../utils/hashPassword');

const updatePasword = async (accountId, password) => {
    const query = 'Update account set password = $1 where account_id = $2';
    const values = [accountId, hashPassword(password)];
    try {
        await pool.query(query, values);
    } catch (error) {
        console.log('Error for updating password ');
        throw new Error('Faild to update password ');
    }
};

const deleteUser = async (accountId) => {
    const deleteAccountQuery = 'DELETE FROM account WHERE account_id = $1 RETURNING person_id';
    const deletePersonQuery = 'DELETE FROM person WHERE person_id = $1';
    const values = [accountId];
    console.log(values);

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
    const { accountId, username } = user;

    if (!accountId) {
        throw new Error('Account ID is required to update the account');
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (username) {
        fields.push(`username = $${index++}`);
        values.push(username);
    }

    // Add the email for the WHERE clause
    values.push(accountId);

    const query = `UPDATE account SET ${fields.join(', ')} WHERE account_id = $${index}`;

    try {
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            throw new Error('No account found with the provided accountId');
        }

    } catch (err) {
        throw new Error('Failed to update account');
    }
};

const findByEmail = async (email) => {
    const query = 'select * from account where email = $1';
    return await pool.query(query, [email]);
};

const updatePin = async (email, pin) => {
    const query = 'UPDATE account SET pin = $1, expiration_date = $2 WHERE email = $3';
    const expirationDate = new Date(Date.now() + 90 * 1000).toISOString(); // ISO format
    const formattedDate = expirationDate.replace('T', ' ').split('.')[0]; // 'YYYY-MM-DD HH:MI:SS'
    return await pool.query(query, [pin, formattedDate, email]);
};


const signIn = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required.');
        }

        const query = `SELECT account_id, is_validated FROM account WHERE email = $1 AND password = $2;`;
        const result = await pool.query(query, [email, password]);

        // Check if user exists
        if (result.rowCount === 0) {
            throw new Error('Invalid email or password.');
        }

        const account = result.rows[0];

        // Check if the account is validated
        if (!account.is_validated) {
            throw new Error('Account is not validated. Please verify your email.');
        }

        return account.account_id;

    } catch (error) {

        console.log(error);
        throw new Error(error.message || 'Sign-in failed.');
    }
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
        await client.query(accountInsertQuery, [personId, username, email, hashPassword(password)]);

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

module.exports =  { 
    updatePasword, 
    deleteUser, 
    updateUser, 
    findByEmail, 
    updatePin, 
    decrementAttempt, 
    addUser , 
    updateEmailValidation,
    signIn
}; 