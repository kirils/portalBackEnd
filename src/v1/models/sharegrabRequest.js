const mongoose = require('mongoose');

const sharegrabRequestSchema = new mongoose.Schema({
  owner:                  { type: String, required: true, index: true },
  security_code:          { type: String, required: true, index: true },
  worbli_account_name:    { type: String },
  state:                  { type: String }, // success / fail
  message:                { type: String }, // transaction id?
  date_inserted:          { type: Date, require: true, default: Date.now }
});

module.exports = mongoose.model('sharegrab_request', sharegrabRequestSchema);
