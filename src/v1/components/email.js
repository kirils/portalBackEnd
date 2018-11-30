const AWS = require('aws-sdk');
AWS.config.update({ "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, "region": "us-east-1" });

function send_email(email, newjwt, template, firstName) {
    return new Promise(function(resolve, reject) {
        if(template === 'authorize'){
          var title = '[WORBLI] Verify Email';  
          var url = process.env.FRONT_END_URL;
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
                  <img src="https://d1r0t58ow9lja0.cloudfront.net/email-logo.png" width="200px" style="margin-bottom: 20px;">
                  <table style="margin: 0; padding: 60px; background-color: #FFFFFF; text-align:left; border-radius: 0.4em;" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td><b>Confirm Your Registration</b></td>
                  </tr>  
                  <tr>
                    <td>
                    </br></br></br>
                      <p>Welcome to WORBLI!</p>
                      <p>Click the button below to confirm your email.</p>
                      <a href="${url}/dashboard/password?token=${newjwt}"><button type="button" style="cursor: pointer; outline: none; font-weight: 600; border-radius:3px; background-color: #37527A; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 15px; width:250px">Verify Email</button></a></br></br>
                      <p>If you can't confirm by clicking the button above, please copy the address below to the browser address bar to confirm.</p>
                      <a href="${url}/dashboard/password?token=${newjwt}">${url}/dashboard/password?token=${newjwt}</a></br></br></br>
                      <p>If this activity is not your own operation, please contact us immediately via support@worbli.io</p>
                    </td>
                    </tr>
                  </table>
                </td>
                </tr>
              </table>
              </body>
            </html>
            `
        
          } 
          if(template === 'reset'){
            var title = '[WORBLI] Password Reset';
            var url = process.env.FRONT_END_URL
            var htmlEmail = `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>[WORBLI] Password reset</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              </head>
              <body style="margin: 0; padding: 0; background-color: #F7F7F7; min-height: 100vh">
              <table style="margin: 0; padding: 60px; background-color: #F7F7F7;" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td style="text-align:center">
                  <img src="https://d1r0t58ow9lja0.cloudfront.net/email-logo.png" width="200px" style="margin-bottom: 20px;">
                  <table style="margin: 0; padding: 60px; background-color: #FFFFFF; text-align:left; border-radius: 0.4em;" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td><b>Reset your password</b></td>
                  </tr>  
                  <tr>
                    <td>
                    </br></br></br>
                      <p>Password Reset!</p>
                      <p>Click the button below to reset your password.</p>
                      <a href="${url}/dashboard/password?token=${newjwt}"><button type="button" style="cursor: pointer; outline: none; font-weight: 600; border-radius:3px; background-color: #37527A; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 15px; width:250px">Reset Password</button></a></br></br>
                      <p>If you can't reset by clicking the button above, please copy the address below to the browser address bar to reset.</p>
                      <a href="${url}/dashboard/password?token=${newjwt}">${url}/dashboard/password?token=${newjwt}</a></br></br></br>
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
        
          } 
          if (template === 'kycfail') {
            var title = '[WORBLI] Identity Verification';
            var name = firstName.charAt(0).toUpperCase() + firstName.substr(1) || '';
            var htmlEmail = `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>[WORBLI] Password reset</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              </head>
              <body style="margin: 0; padding: 0; background-color: #F7F7F7; min-height: 100vh">
              <table style="margin: 0; padding: 60px; background-color: #F7F7F7;" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td style="text-align:center">
                  <img src="https://d1r0t58ow9lja0.cloudfront.net/email-logo.png" width="200px" style="margin-bottom: 20px;">
                  <table style="margin: 0; padding: 60px; background-color: #FFFFFF; text-align:left; border-radius: 0.4em;" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td><b>Identity Verification</b></td>
                  </tr>  
                  <tr>
                    <td>
                    <br/><br/><br/>
                    <p>Dear ${name},</p>
                    <p>We regret to inform you that your identity verification with Worbli has <strong>failed</strong>.</p>
                    <p>When an account has failed identity verification it is often due to one or more of the following reasons:</p><br />
                    <ul>
                      <li>The quality of the images of the documents you uploaded was too low.</li>
                      <li>Your selfie was taken in poor light.</li>
                      <li>You may have had objects obstructing your selfie (hat, glasses etc).</li>
                      <li>We couldn’t match your selfie to the picture on the document that you uploaded.</li>
                      <li>You were found on one or more of the global watchlists that we track.</li>
                    </ul>
                    <br />
                    <p>If you believe that your application was rejected due to an error, or if you have any questions about your application, please open a ticket at our <a href="https://worbli.zendesk.com/hc/en-us/requests/new" target="_blank">support site</a>.</p>
                    <br />
                    <p>The Worbli Team</p><br />
                    </td>
                    </tr>
                  </table>
                </td>
                </tr>
              </table>
              </body>
            </html>
            `
          }
        var params = {
        Destination: {ToAddresses: [email]},
        Message: {
            Body: { 
            Html: {Charset: "UTF-8", Data: htmlEmail}
            },
            Subject: {Charset: 'UTF-8', Data: title}
        },
        Source: 'do-not-reply@worbli.io', 
        ReplyToAddresses: ['do-not-reply@worbli.io'],
        };     
        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();  
        sendPromise
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = { send_email };
