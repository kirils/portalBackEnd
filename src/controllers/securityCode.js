const crypto = require('crypto')
const biguint = require('biguint-format')
const securityCodeModel = require('../models/securityCode.js')
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function create(req, res) {
  const security_code = biguint(crypto.randomBytes(64), 'hex', { prefix: '0x' }); // TODO: Check with contract dev that this is right the value is `0x748eba3cfdc84c0d9ecd86a4878c7291649abee4c93417226af3ed2f31ec6e81c4ebafc770f77eb9aefec1662fc7fbb70e4b855589ef976d1ff88b88652a2262`
  securityCodeModel({security_code}).save((err) => {
    if (err) {
        res.json({err})
    } else {
        res.json({security_code}
    )};
  });
}

/**
 * Lookup Security Code and return true if the security code is in the database or false if its not 
 * @returns {User}
 */
function lookup(req, res) {
    const security_code = req.params.securityCode;
    securityCodeModel.find({security_code}, (err, data) => { 
        if(data[0] && data[0].security_code) {
            return res.send(true);
        } else  {
            return res.send(false);
        }
    });   
}

module.exports = { create, lookup };
