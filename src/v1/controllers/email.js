//const registerUserModel = require('../models/registerUser.js')
const jwt = require('../components/jwt.js');

function post_authorize(req, res) {
    console.log(req.body.email)
    console.log(req.body.agreed_terms) // true
    console.log(req.body.agreed_marketing) // true
    res.status(200).json({data: "pass"})
}
function post_welcome(req, res) {
    console.log(req.body)
    res.json(true)
}
function post_reset(req, res) {
    console.log(req.body)
    res.json(true)
}
function post_add(req, res) {
    console.log(req.body.email);
    //TODO: Save email to database
    res.json({data: 'pass'})
}

module.exports = { post_authorize, post_welcome, post_reset, post_add};
