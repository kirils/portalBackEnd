require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET


function jwt_sign(payload) {
    return jwt.sign(payload, jwtSecret);
}
function jwt_expires(payload, expiresIn) {
    return jwt.sign(payload, jwtSecret, {expiresIn});
}
function jwt_decode(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = { jwt_sign, jwt_expires, jwt_decode };
