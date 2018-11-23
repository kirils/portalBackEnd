const userModel = require('../models/user.js')
const snapShotModel = require('../models/snapShot.js')
const jwt = require('../components/jwt.js');
const account = require('../components/account.js');
const onfido = require('../components/onfido.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function post_login(req, res) {
    const email = req.body.email;
    const plaintextPassword = req.body.password;
    userModel.find({email},(err, data) => {
        if (!err && data && data[0] && data[0].password) {
            const hash = data[0].password;
            const mongo_id = data[0]._id;
            const email = data[0].email;
            const onfido_status = data[0].onfido_status;
            const onfido_id = data[0].onfido_id || null;
            const security_code = data[0].security_code || null;
            bcrypt.compare(plaintextPassword, hash, function(err, data) {
                if(data === true){
                    const token = jwt.jwt_expires({email, onfido_status, onfido_id, security_code}, '72h');
                    res.status(200).json({data: true, token, onfido_status})
                } else {
                    res.status(400).json({data: false})
                }
            });
        } else {
            res.status(400).json({data: false})
        }
    })
}

function post_auth(req, res) {
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((data) => {
        const onfido_status = data.onfido_status;
        const security_code = data.security_code;
        res.status(200).json({data: true, onfido_status, security_code})
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
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((jwtdata) => {
        if(jwtdata.onfido_status === 'default' || jwtdata.onfido_status === 'started'){
            const onfido_status = 'started';
            const onfido_id = jwtdata.onfido_id;
            const email = jwtdata.email;
            const name_first = req.body.name_first;
            const name_middle = req.body.name_middle;
            const name_last = req.body.name_last;
            
            const address_country = req.body.address_country;
            const address_zip = req.body.address_zip;
            const address_town = req.body.address_town;
            const address_flat_number = req.body.address_flat_number || "";
            const address_building_name = req.body.address_building_name || "";
            const address_building_number = req.body.address_building_number || "";
            const address_one = req.body.address_one || "";
            const address_two = req.body.address_two || "";            
            const address_state = req.body.address_state || "";
            
            const phone_code = req.body.phone_code;
            const phone_mobile = req.body.phone_mobile;
            const date_birth_day = req.body.date_birth_day;
            const date_birth_month = req.body.date_birth_month;
            const date_birth_year = req.body.date_birth_year;
            const gender = req.body.gender;
            const query = {email}

            const newData = {
                name_first, 
                name_middle, 
                name_last, 
                address_country, 
                address_zip, 
                address_town, 
                address_flat_number,
                address_building_name,
                address_building_number,
                address_one, 
                address_two, 
                address_state, 
                phone_code, 
                phone_mobile, 
                date_birth_day, 
                date_birth_month, 
                date_birth_year, 
                gender, 
                onfido_status
            };
            userModel.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
                if (!err){
                    onfido.update_applicant(newData, onfido_id)
                    .then(()=>{
                        const newjwt = jwt.jwt_sign({email, onfido_status, onfido_id});
                        res.status(200).json({data: true, newjwt})
                    })
                    .catch(()=>{
                        res.status(400).json({data: false})
                    })
                } else {
                    console.log(err)
                    res.status(400).json({data: false})
                }
            });
        }
    })
    .catch((jwtdata) => {
        res.status(400).json({data: false})
    })
}




function get_profile(req, res) {
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((jwtdata) => {
        const email = jwtdata.email;
        userModel.find({email},(err, data) => {
            if (!err && data && data[0]) {
                let profile = data[0];
                onfido.check_images(profile.onfido_id)
                .then((imageCount) => {
                    profile.password = "";
                    profile.onfido_id = "";
                    const image_count = imageCount;
                    res.status(200).json({data: true, profile: profile, image_count})
                })
            } else {
                res.status(400).json({data: false})
            }
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

function put_profile(req, res) {
    console.log(req.body)
    res.json(true)
}

function post_account(req, res) {
        const worbli_account_name = req.body.worbli_account_name;
        const public_key_active = req.body.public_key_active;
        const public_key_owner = req.body.public_key_owner;
        const bearer = req.headers.authorization.split(" ")
        const token = bearer[1];
        let jwtData;
        jwt.jwt_decode(token)
        .then((jwtdata) => {
            const onfido_id = jwtdata.onfido_id;
            const email = jwtdata.email;
            const newAccount = {worbli_account_name, public_key_active, public_key_owner, email}
            const onfido_status = jwtdata.onfido_status;
            jwtData = jwtdata;
            if (onfido_status === 'approved'){
                userModel.find({email},(err, data) => {
                    if (!err && data && data[0].worbli_account_name) {
                        res.status(400).json({data: false, error: `You have already claimed the name: ${data[0].worbli_account_name}`})
                    } else {
                        account.check_exists(worbli_account_name)
                        .then((exists) => {
                            if(exists === true || exists === undefined){
                                res.status(400).json({data: false, error: 'Name already exists'})
                            } else {
                                consiole.log('---------- ACCOUNT BEING CREATED -------------')
                                return account.create_account(newAccount)
                            }
                        })
                        .then((data) => {
                            const email = jwtData.email;
                            const onfido_status = 'started';
                            const newData = {worbli_account_name, onfido_status}
                            const query = {email};
                            userModel.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
                                if (!err){
                                    const newjwt = jwt.jwt_sign({email, onfido_status, onfido_id});
                                    res.status(200).json({data: true, newjwt})
                                } else {
                                    res.status(400).json({data: false})
                                }
                            });
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({data: false})
                        })
                    }
                })
            } else  {
                console.log('----- NOT APPROVED -----')
            }
        })
    }

function get_account(req, res) {
    console.log(req.body)
    res.json(true)
}

function post_snapshot(req, res) {
    const snap_shot = req.query.account;
    snapShotModel.find({account_name: snap_shot}, (err, data) => { 
        if(data[0] && data[0].account_name) {
            return res.send(data[0]);
        } else  {
            return res.send(false);
        }
    });  
}

function get_sharedrop(req, res){
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((jwtdata) => {
        const email = jwtdata.email;
        userModel.find({email},(err, data) => {
            if (!err && data && data[0] && data[0].security_code) {
                const security_code = data[0].security_code;
                res.status(200).json({data: true, security_code})
            }
        })
    })
}

module.exports = { post_login, post_auth, post_profile, get_profile, put_profile, post_account, get_account, post_snapshot, post_password, get_sharedrop};
