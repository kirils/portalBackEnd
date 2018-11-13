const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      worbli_account_name: Joi.string().lowercase().regex(/^[a-z](?=[a-z1-5]{5,11}$)/),
      public_key_active: Joi.string().max(53).required(),
      public_key_owner: Joi.string().max(53).required()
    }
  }
};

