const mongoose = require('mongoose');

const seurityCodeSchema = new mongoose.Schema({
    security_code: { type: String, unique: true }
});

module.exports = mongoose.model('SecurityCode', seurityCodeSchema);