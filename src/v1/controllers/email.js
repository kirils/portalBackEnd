//const registerUserModel = require('../models/registerUser.js')
const jwt = require('../components/jwt.js');

function post_authorize(req, res) {
    console.log(jwt.jwt_decode('eyJhbGciOiJIUzI1NiJ9.aGVsbG8.WPGNqbPCBkTVCltUUwXd-aJ7-azUbDV7ABHLdz-9c6o'))
    res.json(true)
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
    console.log(req.body)
    res.json(true)
}

module.exports = { post_authorize, post_welcome, post_reset, post_add};
