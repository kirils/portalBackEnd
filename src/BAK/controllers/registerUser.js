const registerUserModel = require('../models/registerUser.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function create(req, res) {
    const security_code = req.body.security_code;
    const first_name = req.body.first_name;
    const last_name = req.body.family_name;
    const country_residence = req.body.country_residence;
    const plaintextPassword = req.body.password;
    const updated_at = Date.now()

    bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
      if (!err){
        const password = hash;
        const newData = {first_name, last_name, country_residence, password, updated_at}
        const query = {security_code};
    
        registerUserModel.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
            if (!err){
                res.json(true)
            } else {
                res.json(false)
            }
        });
      } else {
        res.json(false)
      }
    });
}

module.exports = { create };
