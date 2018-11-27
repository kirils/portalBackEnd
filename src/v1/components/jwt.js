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
  return new Promise(function(resolve, reject) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(!err && decoded){
        resolve(decoded)
      } else {
        reject(err)
      }
    });
  })
}

module.exports = { jwt_sign, jwt_expires, jwt_decode };
