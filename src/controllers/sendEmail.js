var AWS = require('aws-sdk');
AWS.config.update({ "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, "region": "us-east-1" });
const regusterUserModel = require('../models/registerUser.js')
/**
 * Send an email verification email 
 * @returns {email recipt}
 */
function validate(req, res) {
  const data = req.params.email.split("~");
  const email = data[0];
  const security_code = data[1];
  const created_at = Date.now();
  const updated_at = Date.now()
  if (email && security_code){
    regusterUserModel({email, security_code, created_at, updated_at}).save((err) => {
      if (err) {
          regusterUserModel.find({email}, (err, data) => {
            if (!err){
              res.json(true);
              let email = data[0].email;
              let security_code = data[0].security_code;
              _sendEmail(email, security_code);
            } else {
              res.json(false)
            }
          });  
      } else {
        res.json({data:'success'})
        _sendEmail(email, security_code);
      };
    });
  } else {
    res.json(false)
  }
}

function _sendEmail(email, security_code){
  var htmlEmail = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>[WORBLI] Email Confirmation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F7F7F7; min-height: 100vh">
    <table style="margin: 0; padding: 60px; background-color: #F7F7F7;" cellpadding="0" cellspacing="0" width="100%">
      <tr>
      <td style="text-align:center">
        <img src="https://www.dac.city/esm-bundled/images/email-logo.png" width="200px" style="margin-bottom: 20px;">
        <table style="margin: 0; padding: 60px; background-color: #FFFFFF; text-align:left; border-radius: 0.4em;" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td><b>Confirm Your Registration</b></td>
        </tr>  
        <tr>
          <td>
          </br></br></br>
            <p>Welcome to WORBLI!</p>
            <p>Click the button below to confirm your email.</p>
            <a href="https://www.dac.city/dashboard/profile/${security_code}/"><button type="button" style="cursor: pointer; outline: none; font-weight: 600; border-radius:3px; background-color: #37527A; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 15px; width:250px">Verify Email</button></a></br></br>
            <p>If you can't confirm by clicking the button above, please copy the address below to the browser address bar to confirm.</p>
            <a href="https://www.dac.city/dashboard/profile/${security_code}/">https://www.dac.city/dashboard/profile/${security_code}/</a></br></br></br>
            <p>If this activity is not your own operation, please contact us immediatly via support@worbli.io</p>
          </td>
          </tr>
        </table>
      </td>
      </tr>
    </table>
    </body>
  </html>
  `
  var params = {
    Destination: {ToAddresses: [email]},
    Message: {
      Body: { 
        Html: {Charset: "UTF-8", Data: htmlEmail}
      },
      Subject: {Charset: 'UTF-8', Data: '[WORBLI] Email Validation'}
    },
    Source: 'do-not-reply@worbli.io', 
    ReplyToAddresses: ['do-not-reply@worbli.io'],
  };       
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();  
  sendPromise
  .then((data) => {return true})
  .catch((err) => {return false});
}

/**
 * Send a Worbli welcome email 
 * @returns {email recipt}
 */
function welcome(req, res) {
    var htmlEmail = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>[WORBLI] Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F7F7F7; min-height: 100vh">
      <table style="margin: 0; padding: 60px; background-color: #F7F7F7;" cellpadding="0" cellspacing="0" width="100%">
        <tr>
        <td style="text-align:center">
          <img src="https://www.dac.city/esm-bundled/images/email-logo.png" width="200px" style="margin-bottom: 20px;">
          <table style="margin: 0; padding: 60px; background-color: #FFFFFF; text-align:left; border-radius: 0.4em;" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td><b>Welcome to WORBLI</b></td>
          </tr>  
          <tr>
            <td>
            </br></br></br>
              <p>Hello:</p>
              <p>We have detected you have logged in for the first time and wanted to welcome you!</p>
              <p>If this activity is not your own operation, please contact us immediatly via support@worbli.io</p>
            </td>
            </tr>
          </table>
        </td>
        </tr>
      </table>
      </body>
    </html>
    `
    var params = {
        Destination: {ToAddresses: [req.params.email]},
        Message: {
            Body: { 
                Html: {Charset: "UTF-8", Data: htmlEmail},
                },
            Subject: {Charset: 'UTF-8', Data: '[WORBLI] Welcome to Worbli!'}
        },
        Source: 'do-not-reply@worbli.io', 
        ReplyToAddresses: ['do-not-reply@worbli.io'],
      };       
    
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    
    sendPromise
    .then((data) => {
        return res.json(true);
    })
    .catch((err) => {
        return res.json(false);
    });
}
module.exports = { validate, welcome };

