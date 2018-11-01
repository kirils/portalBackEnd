const mongoose = require('mongoose');

const registerUserSchema = new mongoose.Schema({
    email:                  { type: String, required: true, unique: true, index: true },
    security_code:          { type: String, required: true, unique: true, index: true },
    first_name:             { type: String },
    last_name:              { type: String },
    country_residence:      { type: Number },
    password:               { type: String },
    mainnet_account_name:   { type: String },
    worbli_account_name:    { type: String, unique: true},
    worbli_account_created: { type: Date },
    created_at:             { type: Date },
    updated_at:             { type: Date }
});

module.exports = mongoose.model('RegisterUser', registerUserSchema);