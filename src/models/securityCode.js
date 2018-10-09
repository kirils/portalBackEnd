const mongoose = require('mongoose');

const seurityCodeSchema = new mongoose.Schema({
    security_code: { type: String, unique: true },
    created_at:     Date,
    updated_at:     Date
});

module.exports = mongoose.model('SecurityCode', seurityCodeSchema);