const fetch = require('node-fetch');

class EmailUtils {
    static async isEmailAvailable(email) {
        const apiKey = process.env.ABSTRACT_API_KEY;

        if (!apiKey) {
            throw new Error('Abstract API key is not defined in environment variables');
        }

        const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const { deliverability, is_valid_format } = data;

            return is_valid_format.value && deliverability === 'DELIVERABLE';
        } catch (error) {
            return false;
        }
    }
}

module.exports = EmailUtils;