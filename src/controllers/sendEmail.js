const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY
var AWS = require('aws-sdk');
var uuid = require('uuid');




/**
 * Send a Worbli welcome email 
 * @returns {email recipt}
 */
function create(req, res) {


}

module.exports = { create };
