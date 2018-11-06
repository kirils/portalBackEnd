const mongoose = require('mongoose');

const snapShotSchema = new mongoose.Schema({
    account_name:   { type: String, required: true, unique: true },
    owner_key:      { type: String, required: true, unique: true },
    active_key:     { type: String, required: true, unique: true },
    total_nostake:  { type: Number, required: true },
    staked:         { type: Number, required: true },
    delegated:      { type: Number, required: true },
    total:          { type: Number, required: true },
    created_at:     Date,
    updated_at:     Date
});

module.exports = mongoose.model('SnapShot', snapShotSchema);