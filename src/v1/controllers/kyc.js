//const registerUserModel = require('../models/registerUser.js')

function post_applicant(req, res) {
    console.log(req.body)
    res.json(true)
}
function get_applicant(req, res) {
    console.log(req.body)
    res.json(true)
}

module.exports = { post_applicant, get_applicant};
