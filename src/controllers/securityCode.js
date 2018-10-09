var bigInt = require("big-integer");
var crypto = require('crypto');
const securityCodeModel = require('../models/securityCode.js')
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function create(req, res) {
  const security_code = bigInt(Buffer.from(crypto.randomBytes(8)).toString('hex'), 16);
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
