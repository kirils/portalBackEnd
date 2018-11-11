//const registerUserModel = require('../models/registerUser.js')
const jwt = require('../components/jwt.js');

function post_login(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    res.json({data: 'pass'})
}
function post_auth(req, res) {
    console.log(req.headers.authorization)
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((data) => {
        res.status(200).json({data: true})
    })
    .catch((err) => {
        res.status(400).json({data: false})
    })
}

function post_profile(req, res) {
    console.log(req.body)
    res.json(true)
}
function get_profile(req, res) {
    console.log(req.body)
    res.json(true)
}
function put_profile(req, res) {
    console.log(req.body)
    res.json(true)
}
function post_account(req, res) {
    console.log(req.body)
    res.json(true)
}
function get_account(req, res) {
    console.log(req.body)
    res.json(true)
}
function post_snapshot(req, res) {
    console.log(req.body)
    res.json(true)
}

module.exports = { post_login, post_auth, post_profile, get_profile, put_profile, post_account, get_account, post_snapshot};
