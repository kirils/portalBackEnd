const loggerModel = require('../models/log.js')

function log(_action, _email, _data) {
    const email = _email;
    const data = _data;
    const created_at = (new Date).getTime();
    const action = _action;
    const from = 'back end';
    const str_data = JSON.stringify(data);
    loggerModel({email, data: str_data, created_at, action, from}).save()
}

module.exports = { log };