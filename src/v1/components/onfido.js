const fetch = require('./fetch.js');

function create_applicant(data) {
    return new Promise(function(resolve, reject) {
        const first_name = 'Enter';
        const last_name = 'Name';
        const applicant = {
            url: 'https://api.onfido.com/v2/applicants',
            method: 'POST',
            headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
            body: {first_name, last_name}
        }
        fetch.fetch_data(applicant)
        .then((onfido_id) => {
            resolve(onfido_id.id)
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function update_applicant(data) {
    return new Promise(function(resolve, reject) {
        resolve(true)
    })
}

module.exports = { create_applicant, update_applicant };
