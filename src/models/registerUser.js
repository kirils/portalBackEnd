const mongoose = require('mongoose');

const registerUserSchema = new mongoose.Schema({
    first_name:             { type: String, required: true},
    last_name:              { type: String, required: true},
    country_residence:      { type: String, required: true},
    password:               { type: String, required: true},
    mainnet_account_name:   { type: String, required: true},
    worbli_account_name:    { type: String, required: true},
    worbli_account_created: { type: Date },
    authenteq_id:           { type: Number },
    security_code:          { type: String, required: true, unique: true},
    created_at:             Date,
    updated_at:             Date
});

module.exports = mongoose.model('RegisterUser', registerUserSchema);