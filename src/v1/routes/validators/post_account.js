const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      worbli_account_name: Joi.string().lowercase().regex(/^[a-z](?=[a-z1-5]{5,11}$)/),
      public_key_active: Joi.string().regex(/^EOS[A-Za-z0-9]{50}$/),
      public_key_owner: Joi.string().regex(/^EOS[A-Za-z0-9]{50}$/),
    }
  }
};

