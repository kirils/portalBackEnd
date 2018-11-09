const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      name_first: Joi.string().lowercase().max(35).required(),
      name_middle: Joi.string().lowercase().max(35).required(),
      name_last: Joi.string().lowercase().max(35).required(),
      address_one: Joi.string().lowercase().alphanum().max(255).required(),
      address_two: Joi.string().lowercase().alphanum().max(150).required(),
      address_city: Joi.string().lowercase().max(250).required(),
      address_region: Joi.string().lowercase().max(255).required(),
      address_zip: Joi.string().lowercase().alphanum().max(15).required(),
      address_country: Joi.string().lowercase().max(3).required(),
      phone_landline: Joi.number().integer().min(3).max(15).required(),
      phone_mobile: Joi.number().integer().min(3).max(15).required(),
      email: Joi.string().lowercase().email({ minDomainAtoms: 2 }).required(),
      gender: Joi.string().lowercase().required().min(4).max(6),
      date_birth: Joi.date().iso().required(),
    }
  }
};