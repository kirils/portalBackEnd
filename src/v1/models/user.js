const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:                  { type: String, required: true, index: true, unique: true },
    agreed_terms:           { type: Boolean },
    agreed_marketing:       { type: Boolean },
    password:               { type: String },
    worbli_account_name:    { type: String, index: true },
    first_name:             { type: String },
    family_name:            { type: String },
    country_residence:      { type: Number },
    security_code:          { type: String },
    created_at:             Date,
    updated_at:             Date
});

module.exports = mongoose.model('user', userSchema);