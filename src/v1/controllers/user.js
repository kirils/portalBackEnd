const userModel = require('../models/user.js')
const jwt = require('../components/jwt.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function post_login(req, res) {
    const email = req.body.email;
    const plaintextPassword = req.body.password;
    userModel.find({email},(err, data) => {
        if (!err && data) {
            const hash = data[0].password;
            bcrypt.compare(plaintextPassword, hash, function(err, data) {
                if(data === true){
                    res.status(200).json({data: true})
                } else {
                    res.status(400).json({data: false})
                }
            });
        }
    })
}




function post_auth(req, res) {
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


function post_password(req, res) {
    const plaintextPassword = req.body.password;
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((data) => {
        bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
            if (!err){
                const password = hash;
                const email = data.email;
                const newData = {password}
                const query = {email};
                userModel.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
                    if (!err){
                        res.status(200).json({data: true})
                    } else {
                        res.status(400).json({data: false})
                    }
                });
            }
        })
    })
    .catch((err) => {
        res.status(400).json({data: false})
    })
}

function post_profile(req, res) {

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


module.exports = { post_login, post_auth, post_profile, get_profile, put_profile, post_account, get_account, post_snapshot, post_password};
