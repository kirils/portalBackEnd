const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      name_first: Joi.string().lowercase().min(1).max(35).required(),
      name_middle: Joi.string().lowercase().max(35),
      name_last: Joi.string().lowercase().max(35).required(),
      address_one: Joi.string().lowercase().max(255).required(),
      address_two: Joi.string().lowercase().max(150),
      address_city: Joi.string().lowercase().max(50).required(),
      address_region: Joi.string().lowercase().max(50).required(),
      address_zip: Joi.string().lowercase().alphanum().max(15).required(),
      address_country: Joi.string().lowercase().max(3).required(),
      phone_code: Joi.string().min(1).max(5).required(),
      phone_mobile: Joi.number().required(),
      date_birth: Joi.string().lowercase().min(8).max(10).required(),
      gender: Joi.string().lowercase().min(4).max(6).required(),
    }
  }
};



