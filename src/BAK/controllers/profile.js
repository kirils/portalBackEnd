const userModel = require('../models/user.js')
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function create(req, res) {
    const email = req.params.email;
    const password = req.params.password;
    const first_name = req.params.first_name;
    const family_name = req.params.family_name;
    const country_residence = req.params.country_residence;
    registerUserModel({email, password, first_name, family_name, country_residence}).save((err) => {
        if (err) {
            res.json({err})
        } else {
            res.json({security_code}
        )};
  });
}

module.exports = { create };
