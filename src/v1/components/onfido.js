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
        const first_name = data.name_first;
        const middle_name = data.name_middle
        const last_name = data.name_last;
        const gender = data.gender;
        const date_birth_day = data.date_birth_day;
        const date_birth_month = data.date_birth_month;
        const date_birth_year = data.date_birth_year;
        const dob = `${date_birth_year}-${date_birth_month}-${date_birth_day}`;
        const country = data.address_country;
        const postcode = data.address_zip;
        const state = data.address_region;
        const town = data.address_city;
        const street = data.address_one;
        const onfidoid = onfido_id;
        const mobile = `+ ${data.phone_code} ${data.phone_mobile}`;
        const building_number = data.address_number

        const applicant = {
            url: `https://api.onfido.com/v2/applicants/${onfidoid}`,
            method: 'PUT',
            headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
            body: {first_name, last_name, middle_name, country, dob, mobile, gender,
            'addresses[][building_number]': building_number,
            'addresses[][street]': street,
            'addresses[][town]': town,
            'addresses[][state]': state,
            'addresses[][postcode]': postcode,
            'addresses[][country]': country }
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

function check_images(onfido_id) {
    return new Promise(function(resolve, reject) {
        const applicant = {
            url: `https://api.onfido.com/v2/applicants/${onfido_id}/documents`,
            method: 'GET',
            headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
        }
        fetch.fetch_data(applicant)
        .then((imageData) => {
            if(imageData && imageData.documents && imageData.documents.length >0){
                const docCount = imageData.documents.length;
                resolve(docCount);
            } else {
                const docCount = 0;
                resolve(docCount); 
            }

        })
        .catch((err) => {
            reject(err);
        })
    })
}



module.exports = { create_applicant, update_applicant, check_images };
