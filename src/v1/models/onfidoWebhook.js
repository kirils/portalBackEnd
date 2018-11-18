const mongoose = require('mongoose');

const onfidoWebhookSchema = new mongoose.Schema({
    onfido_id:              { type: String, required: true },
    action:                 { type: String, required: true },
    resource_type:          { type: String, required: true },
    status:                 { type: String, required: true },
    completed_at:           { type: String, required: true },
    href:                   { type: String, required: true },
});

module.exports = mongoose.model('onfidowebhook', onfidoWebhookSchema);