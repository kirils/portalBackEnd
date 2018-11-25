const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    email:          { type: String, required: true },
    data:           { type: String },
    browser:        { type: String },
    created_at:     { type: Date, required: true },
    action:         { type: String, required: true },
    from:           { type: String, required: true },
});

module.exports = mongoose.model('Log', logSchema);


