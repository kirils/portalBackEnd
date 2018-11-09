const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      email: Joi.string().lowercase().email({ minDomainAtoms: 2 }).required(),
      agreed_terms: Joi.boolean().truthy('Y').required(),
      agreed_marketing: Joi.boolean().required()
    }
  }
};



