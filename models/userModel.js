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


module.exports =  { updatePaswword, deleteUser, updateUser, addUser }; 