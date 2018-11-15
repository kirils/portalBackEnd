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

function update_applicant(data, onfido_id) {
    return new Promise(function(resolve, reject) {
        console.log('FIRE 1a')
        //console.log(data);
        const first_name = data.name_first;
        const middle_name = data.name_middle
        const last_name = data.name_last;
        const gender = data.gender;
        const dob = data.date_birth;
        const country = data.address_country;
        const postcode = data.address_zip;
        const state = data.address_region;
        const town = data.address_city;
        const street = data.address_one;
        const onfidoid = onfido_id;
        const mobile = data.phone_mobile;

        const applicant = {
            url: `https://api.onfido.com/v2/applicants/${onfidoid}`,
            method: 'PUT',
            headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
            body: {first_name, last_name, middle_name, country, dob, mobile, gender,
            'addresses[][building_number]': '1460',
            'addresses[][street]': street,
            'addresses[][town]': town,
            'addresses[][state]': state,
            'addresses[][postcode]': postcode,
            'addresses[][country]': country }
        }
        console.log(applicant)

        fetch.fetch_data(applicant)
        .then((onfido_id) => {
            console.log('FIRE 2')
            console.log(onfido_id)
            resolve(onfido_id.id)
        })
        .catch((err) => {
            console.log('FIRE 3')
            reject(err);
        })
    })
}

module.exports = { create_applicant, update_applicant };
