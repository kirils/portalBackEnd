const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      email: Joi.string().lowercase().email({ minDomainAtoms: 2 }).required(),
      confirmation_marketing: Joi.boolean().required()
    }
  }
};