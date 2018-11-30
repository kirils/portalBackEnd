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
    const flat_number = data.address_flat_number;
    const building_name = data.address_building_name;
    const building_number = data.address_building_number;
    const street = data.address_one;
    const sub_street = data.address_two;
    const state = data.address_state;
    const town = data.address_town;
    const postcode = data.address_zip;
    const country = data.address_country.toUpperCase();
    const onfidoid = onfido_id;
    const mobile = `+${data.phone_code} ${data.phone_mobile}`;

    const rowApplicant = {
      url: `https://api.onfido.com/v2/applicants/${onfidoid}`,
      method: 'PUT',
      headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
      body: {first_name, last_name, middle_name, country, dob, mobile, gender,
      'addresses[][flat_number]': flat_number,
      'addresses[][building_name]': building_name,
      'addresses[][building_number]': building_number,
      'addresses[][street]': street,
      'addresses[][sub_street]': sub_street,
      'addresses[][town]': town,
      'addresses[][postcode]': postcode,
      'addresses[][country]': country }
    } 

    const usApplicant = {
        url: `https://api.onfido.com/v2/applicants/${onfidoid}`,
        method: 'PUT',
        headers: {'Authorization': `Token token=${process.env.ONFIDO_TOKEN}`},
        body: {first_name, last_name, middle_name, country, dob, mobile, gender,
        'addresses[][flat_number]': flat_number,
        'addresses[][building_name]': building_name,
        'addresses[][building_number]': building_number,
        'addresses[][street]': street,
        'addresses[][sub_street]': sub_street,
        'addresses[][town]': town,
        'addresses[][state]': state,
        'addresses[][postcode]': postcode,
        'addresses[][country]': country }
    } 

    let applicant;
    if (country == 'usa' || country == 'USA'){
        applicant = usApplicant;
    } else {
        applicant = rowApplicant;
    }
    fetch.fetch_data(applicant)
    .then((onfido_id) => {
        resolve(onfido_id.id);
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
