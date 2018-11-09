const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:                  { type: String, required: true, unique: true },
    password:               { type: String },
    first_name:             { type: String },
    family_name:            { type: String },
    country_residence:      { type: Number },
    security_code:          { type: String },
    created_at:             Date,
    updated_at:             Date
});

module.exports = mongoose.model('user', userSchema);