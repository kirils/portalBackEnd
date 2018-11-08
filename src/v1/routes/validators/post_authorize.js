const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};