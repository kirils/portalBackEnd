const registerUserModel = require('../models/registerUser.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function check(req, res) {
    const email = req.body.email;
    const plaintextPassword = req.body.password;
    registerUserModel.find({email},(err, data) => {
        if(data && data[0] && data[0].password){
            const hash = data[0].password;
            bcrypt.compare(plaintextPassword, hash, function(err, data) {
                if(data === true){
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

module.exports = { check };
