const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:                  { type: String, required: true},
    password:               { type: String, required: true},
    first_name:             { type: String, required: true},
    family_name:            { type: String, required: true},
    country_residence:      { type: Number, required: true},
    security_code:          { type: String, required: true, unique: true},
    created_at:             Date,
    updated_at:             Date
});

module.exports = mongoose.model('login', userSchema);