var unirest = require('unirest');

function create_applicant(data) {
    return new Promise(function(resolve, reject) {
        const onfido_id = 'sd7f98f7s'
        resolve(onfido_id)
    })
}

function update_applicant(data) {
    return new Promise(function(resolve, reject) {
        resolve(true)
    })
}

module.exports = { create_applicant, update_applicant };
