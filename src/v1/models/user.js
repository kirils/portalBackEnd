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
  address_country:        { type: String },
  address_flat_number:    { type: String },
  address_building_name:  { type: String },
  address_building_number:{ type: String },
  address_one:            { type: String },
  address_two:            { type: String },
  address_state:          { type: String },
  address_town:           { type: String },
  address_zip:            { type: String },
  phone_code:             { type: String },
  phone_mobile:           { type: Number },
  date_birth_day:         { type: Number },
  date_birth_month:       { type: Number },
  date_birth_year:        { type: Number },
  gender:                 { type: String },
  security_code:          { type: String, index: true },
  created_at:             { type: Date, default: Date.now },
  updated_at:             { type: Date, default: Date.now },
  onfido_status:          { type: String, required: true },
  onfido_id:              { type: String },
});

module.exports = mongoose.model('user', userSchema);