const  checkEmailExists = require('../services/checkEmailExists');  

const verifEmails = async (req, res) => {    
    const email = req.body.email;
    console.log('email:', email);
    try {
        const emailExists = await checkEmailExists(email); 
        res.json({ emailExists });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Failed to verify email' });
    }
};

module.exports = verifEmails ;
