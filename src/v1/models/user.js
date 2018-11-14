const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:                  { type: String, required: true, index: true, unique: true },
    agreed_terms:           { type: Boolean },
    agreed_marketing:       { type: Boolean },
    password:               { type: String },
    worbli_account_name:    { type: String, index: true },
    name_first:             { type: String },
    name_middle:            { type: String },
    name_last:              { type: String },
    address_one:            { type: String },
    address_two:            { type: String },
    address_city:           { type: String },
    address_region:         { type: String },
    address_zip:            { type: String },
    address_country:        { type: String },
    phone_code:             { type: String },
    phone_mobile:           { type: Number },
    date_birth:             { type: Date },
    gender:                 { type: String },
    security_code:          { type: Number },
    created_at:             { type: Date },
    updated_at:             { type: Date },
    onfido_status:          { type: String, required: true },
    onfido_id:              { type: String },
});

module.exports = mongoose.model('user', userSchema);