const fetch = require('../components/fetch.js')

function post_applicant(req, res) {
    // TODO: Get JWT from header and decode it to find out who the user is, then if they have already completed KYC (not failed) dont allow then to do it again?
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const applicant = {
        url: 'https://api.onfido.com/v2/applicants',
        method: 'POST',
        headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
        body: {first_name, last_name}
    }
    fetch.fetch_data(applicant)
    .then((applicantId) => {
        const applicant_id = applicantId.id;
        // TODO: This will need saving against the users accont, one account can have many applicant ID's, untill one is successfull as they may try and fail many times
        // TODO: save the time so we can clean up after the jwt expires 
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
        res.json(jwt.token)
    })
    .catch((err) => {
        res.json({error: err})
    })
}
function get_applicant(req, res) {
    console.log(req.body)
    res.json(true)
}

module.exports = { post_applicant, get_applicant};
