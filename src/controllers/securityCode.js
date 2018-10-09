const crypto = require('crypto')
const biguint = require('biguint-format')
const securityCodeModel = require('../models/securityCode.js')
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function create(req, res) {
  const security_code = biguint(crypto.randomBytes(64), 'hex', { prefix: '0x' }); // check with contract dev that this is right
  securityCodeModel({security_code}).save((err) => {
      if (err) res.json({err});
  });
  res.json({security_code})
}

/**
 * Lookup Security Code and return true if its in the database or false if its not 
 * @returns {User}
 */
function lookup(req, res) {
    const security_code = req.params.securityCode;
    securityCodeModel.find({security_code}, (err, data) => {  
    
        if(data[0] && data[0].security_code) {
            return res.send(true)
        } else  {
            return res.send(false)
        }
    });   
}

module.exports = { create, lookup };
