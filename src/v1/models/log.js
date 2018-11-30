const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  email:          { type: String, required: true },
  data:           { type: String },
  browser:        { type: String },
  created_at:     { type: Date, default: Date.now },
  action:         { type: String, required: true },
  from:           { type: String, required: true },
});

module.exports = mongoose.model('Log', logSchema);


