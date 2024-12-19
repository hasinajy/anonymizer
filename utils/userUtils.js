class UserUtils {
    static generatePIN(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error('The length of PIN to generate should be a positive value');
        }

        if (length > 20) {
            throw new Error('The length of a PIN code should not surpass 20 ');
        }

        const randomArray = new Uint32Array(length);
        crypto.getRandomValues(randomArray);

        const pin = Array.from(randomArray)
            .map(x => (x % 10).toString())
            .join('');

        return pin;
    }
}

export default UserUtils;
