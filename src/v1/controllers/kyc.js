const fetch = require('../components/fetch.js')

function post_applicant(req, res) {
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
        const referrer = '*://*/*'
        const sdk_token = {
            url: 'https://api.onfido.com/v2/sdk_token',
            method: 'POST',
            headers: {'Authorization': 'Token token=test_cYzbqYVlmYixWQN0V6CYD3AOlIYdeZk9'},
            body: {applicant_id, referrer}
        }
        return fetch.fetch_data(sdk_token)
    })
    .then((jwt) => {
        console.log(jwt.token)
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
