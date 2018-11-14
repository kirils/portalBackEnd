const jwt = require('../components/jwt.js');
const fetch = require('../components/fetch.js');
const onfido = require('../components/onfido.js');
const userModel = require('../models/user.js');

function post_applicant(req, res) {
    let body = req.body
    const bearer = req.headers.authorization.split(" ")
    const token = bearer[1];
    jwt.jwt_decode(token)
    .then((data) => {
        body.email = data.email;
        body.worbli_id = data.mongo_id
        const email = body.email;
        const first_name = body.name_first;
        const middle_name = body.name_middle;
        const last_name = body.name_last;
        const dob = body.date_birth
        const country = body.address_country
        const gender = body.gender
        const mobile = `+${body.phone_code} ${body.phone_mobile}`
        const address = {
            street: body.address_one,
            state: body.address_region,
            postcode: body.address_zip,
            country: body.address_country,
        }
        const applicant = {
            url: 'https://api.onfido.com/v2/applicants',
            method: 'POST',
            headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
            body: {first_name, middle_name, last_name, dob, country, address, mobile, gender, email}
        }
        return fetch.fetch_data(applicant)
    })
    .then((applicantId) => {
        const applicant_id = applicantId.id
        body.applicant_id = applicant_id
        const saveMeRob = body // TODO: Rob save this object to cold storage: req.body at this point not before.
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
        console.log(jwt)
        res.status(200).json({data: true, kyc_token: jwt})
    })
    .catch((err) => {
        res.status(400).json({data: false})
    })


    // // TODO: Get JWT from header and decode it to find out who the user is, then if they have already completed KYC (not failed) dont allow then to do it again?
    // const first_name = req.body.first_name;
    // const last_name = req.body.last_name;
    // const applicant = {
    //     url: 'https://api.onfido.com/v2/applicants',
    //     method: 'POST',
    //     headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
    //     body: {first_name, last_name}
    // }
    // fetch.fetch_data(applicant)
    // .then((applicantId) => {
    //     const applicant_id = applicantId.id;
    //     // TODO: This will need saving against the users accont, one account can have many applicant ID's, untill one is successfull as they may try and fail many times
    //     // TODO: save the time so we can clean up after the jwt expires 
    //     const referrer = '*://*/*'
    //     const sdk_token = {
    //         url: 'https://api.onfido.com/v2/sdk_token',
    //         method: 'POST',
    //         headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
    //         body: {applicant_id, referrer}
    //     }
    //     return fetch.fetch_data(sdk_token)
    // })
    // .then((jwt) => {
    //     res.json(jwt.token)
    // })
    // .catch((err) => {
    //     res.json({error: err})
    // })
}


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
                const mongo_id = doc.mongo_id
                const onfido_status = doc.onfido_status
                const newjwt = jwt.jwt_sign({email, mongo_id, onfido_status});
                res.status(200).json({data: true, token: newjwt})
            } else {
                console.log("fail")
                res.status(400).json({data: false})
            }
        });
    })
    .catch((err) => {
        res.status(400).json({data: false})
    })



    // update status in database

    // make a new token

    // send token and status back to the front end

}

module.exports = { post_applicant, get_applicant};
