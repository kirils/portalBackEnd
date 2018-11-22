const jwt = require('../components/jwt.js');
const fetch = require('../components/fetch.js');
const onfido = require('../components/onfido.js');
const userModel = require('../models/user.js');
const onfidoWebhookModel = require('../models/onfidoWebhook.js');

// gets the jwt for a given acocunt
function post_applicant(req, res) {
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((data) => {
        const applicant_id = data.onfido_id;
        const referrer = '*://*/*'
        const sdk_token = {
            url: 'https://api.onfido.com/v2/sdk_token',
            method: 'POST',
            headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
            body: {applicant_id, referrer}
        }
        return fetch.fetch_data(sdk_token)
    })
    .then((jwt) => {
        res.status(200).json({data: true, kyc_token: jwt.token})
    })
    .catch((err) => {
        res.status(400).json({data: false})
    })
}

// Fired from within the dashboard when the user selects start application
function get_applicant(req, res) {
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    let email;
    jwt.jwt_decode(token)
    .then((data) => {
        email = data.email; 
        return onfido.create_applicant()
    })
    .then((data) => {
        const onfido_id = data;
        const onfido_status = 'started';
        const newData = {onfido_status, onfido_id};
        const query = {email};
        userModel.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
            if (!err){
                const email = doc.email;
                const onfido_status = doc.onfido_status
                const newjwt = jwt.jwt_sign({email, onfido_status, onfido_id});
                res.status(200).json({data: true, token: newjwt, onfido_status:'started'})
            } else {
                res.status(400).json({data: false})
            }
        });
    })
    .catch((err) => {
        res.status(400).json({data: false})
    })
}

function get_check(req, res) {
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    let email;
    let onfido_id;
    jwt.jwt_decode(token)
    .then((data) => {
        console.log(data)
        if(data.onfido_status === 'started'){
            email = data.email;
            onfido_id = data.onfido_id;
            const type = 'express';
            const reports = [{ name: 'document' }, { name: 'facial_similarity' }, {name: 'identity', variant:'kyc'}, {name: 'watchlist', variant:'full'}];
            const sdk_token = {
                url: `https://api.onfido.com/v2/applicants/${onfido_id}/checks`,
                method: 'POST',
                headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`, 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: {type, reports}
            }
            console.log(sdk_token);
            return fetch.fetch_data(sdk_token)
        }
    })
    .then((data) => {
        const onfido_status = 'review'
        const newjwt = jwt.jwt_sign({email, onfido_status, onfido_id});
        const newData = {onfido_status};
        const query = {email};
        userModel.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
            if(!err){
                res.status(200).json({data: true, token: newjwt, onfido_status})
            }
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

function post_webhook(req, res){
    console.log()
    const resource_type = req.body.payload.resource_type;
    const action = req.body.payload.action;
    const onfido_id = req.body.payload.object.id;
    const status = req.body.payload.object.status;
    const completed_at = req.body.payload.object.completed_at;
    const href = req.body.payload.object.href;
    onfidoWebhookModel({resource_type, action, onfido_id, status, completed_at, href}).save((err, data) => {
        if (!err && data) {
            res.status(200).json({status: 200})
        } else {
            res.status(400).json({status: 400})
        }
    })
}

function get_status(req, res){
    console.log('----------- GET STATUS -------------')
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    let email;
    let onfido_id;
    jwt.jwt_decode(token)
    .then((data) => {
        console.log('----------- JWT DATA -------------')
        console.log(data)
        email = data.email;
        onfido_id = data.onfido_id;
        if(data.onfido_status === 'review'){
            const sdk_token = {
                url: `https://api.onfido.com/v2/applicants/${onfido_id}/checks`,
                method: 'GET',
                headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
            }
            return fetch.fetch_data(sdk_token);
        } else {
            console.log('----------- NOT REVIEW STATUS -------------')
        }
    })
    .then((data) => {
        console.log('----------- RESPONSE FROM ONFIDO -------------')
        console.log(data)
        const parse = JSON.parse(data)
        if (parse && parse.checks[0] && parse.checks[0].result === 'clear'){
            console.log('----------- APPROVED -------------')
            console.log(data)
            const onfido_status = 'approved'
            const newjwt = jwt.jwt_sign({email, onfido_status, onfido_id});
            const newData = {onfido_status};
            const query = {email};
            userModel.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
                if(!err){
                    console.log('----------- DATABSE PASS -------------')
                    res.status(200).json({data: true, token: newjwt, onfido_status})
                } else {
                    console.log('----------- DATABSE FAIL -------------')
                }
            })
        } else {
            console.log('----------- NOT CLEAR -------------')
            res.status(400).json({status: 400, data: false})
        }
    })
}

module.exports = { post_applicant, get_applicant, get_check, post_webhook, get_status};


