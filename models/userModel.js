const pool = require('../config/bd');
const { hashPassword } = require('../utils/hashPassword');

const updatePaswword = async (email, password) => {
    const query = 'Update account set password = $1 where email = $2';
    const values = [email,hashPassword(password)];
    try {
        await pool.query(query, values);
    } catch (error) {
        console.log('Error for updating password ');
        throw new Error('Faild to update password ');
    }
}

export { updatePaswword };