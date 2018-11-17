const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      name_first: Joi.string().lowercase().min(1).max(35).required(),
      name_middle: Joi.string().lowercase().max(35),
      name_last: Joi.string().lowercase().max(35).required(),
      address_number: Joi.number().required(),
      address_one: Joi.string().lowercase().max(255).required(),
      address_city: Joi.string().lowercase().max(50).required(),
      address_region: Joi.string().lowercase().max(50).required(),
      address_zip: Joi.string().lowercase().alphanum().max(15).required(),
      address_country: Joi.string().lowercase().max(3).required(),
      phone_code: Joi.string().min(1).max(5).required(),
      phone_mobile: Joi.number().required(),
      date_birth_day: Joi.number().required(),
      date_birth_month: Joi.number().required(),
      date_birth_year: Joi.number().required(),
      gender: Joi.string().lowercase().min(4).max(6).required(),
    }
  }
};



