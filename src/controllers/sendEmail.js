var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws-config.json');
//AWS.config.update({ "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, "region": "us-east-1" });
/**
 * Send a Worbli welcome email 
 * @returns {email recipt}
 */
function create(req, res) {
    var params = {
        Destination: {ToAddresses: ['william@worbli.io']},
        Message: {
            Body: { 
                Html: {Charset: "UTF-8", Data: "<h1>test</h1>"},
                Text: {Charset: "UTF-8", Data: "test"}
                },
            Subject: {Charset: 'UTF-8', Data: '[WORBLI] Email Validation'}
        },
        Source: 'do-not-reply@worbli.io', 
        ReplyToAddresses: ['do-not-reply@worbli.io'],
      };       
    
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    
    sendPromise
    .then((data) => {
        console.log(data.MessageId);
    })
    .catch((err) => {
        console.error(err, err.stack);
    });
}
module.exports = { create };
