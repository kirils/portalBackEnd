const userModel = require('../models/user.js')
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function check(req, res) {
    const email = req.params.email;
    const password = req.params.password;
    userModel.find({email, password},(err, data) => {
    if (err) {
        res.json({err})
    } else {
        res.json({email}
    )};
  });
}

module.exports = { check };
