import { sign } from 'jsonwebtoken';

export function generateToken(user) {
    // TODO: Update token expiry date
    const payload = { id: user.account_id, email: user.email };
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}
