const registerUserModel = require('../models/registerUser.js')
/**
 * Create Security Code
 * @returns {SecurityCode}
 */
function create(req, res) {
    const first_name = req.first_name;
    const last_name = req.last_name;
    const country_residence = req.country_residence;
    const password = req.password;
    const mainnet_account_name = req.mainnet_account_name;
    const worbli_account_name = req.worbli_account_name;
    const worbli_account_created = req.worbli_account_created;
    const authenteq_id = req.authenteq_id;
    const security_code = req.security_code;
    registerUserModel({first_name, last_name, country_residence, password, mainnet_account_name, worbli_account_name, worbli_account_created, authenteq_id, security_code}).save((err) => {
    if (err) {
        res.json({err})
    } else {
        res.json({security_code}
    )};
  });
}

module.exports = { create };
