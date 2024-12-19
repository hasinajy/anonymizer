const poot = require('../config/bd');

const canAuthenticate = async (email) =>{
    const query = 'SELECT COUNT(*) as email_count FROM account WHERE email = $1 AND attempts > 0;';
    const values = [email]; 
    try{
        const result = await poot.query(query, values);
        return result.rows[0].email_count > 0 ; 
    }catch(err){
        console.error('Database error:', err);
        throw new Error('Failed to check email');
    }
};

module.exports = canAuthenticate ; 