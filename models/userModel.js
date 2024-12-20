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


module.exports =  { updatePasword, deleteUser, updateUser, addUser , updateEmailValidation}; 