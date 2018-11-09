const AWS = require('aws-sdk');
AWS.config.update({ "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, "region": "us-east-1" });

function send_email(email, newjwt, template) {
    return new Promise(function(resolve, reject) {
        if(template === 'authorize'){
            var htmlEmail = `<!DOCTYPEhtmlPUBLIC"-//W3C//DTDXHTML1.0Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><htmlxmlns="http://www.w3.org/1999/xhtml"><head><metahttp-equiv="Content-Type"content="text/html;charset=UTF-8"/><title>[WORBLI]EmailConfirmation</title><metaname="viewport"content="width=device-width,initial-scale=1.0"/></head><bodystyle="margin:0;padding:0;background-color:#F7F7F7;min-height:100vh"><tablestyle="margin:0;padding:60px;background-color:#F7F7F7;"cellpadding="0"cellspacing="0"width="100%"><tr><tdstyle="text-align:center"><imgsrc="https://portal-b.worbli.io/esm-bundled/images/email-logo.png"width="200px"style="margin-bottom:20px;"><tablestyle="margin:0;padding:60px;background-color:#FFFFFF;text-align:left;border-radius:0.4em;"cellpadding="0"cellspacing="0"width="100%"><tr><td><b>ConfirmYourRegistration</b></td></tr><tr><td></br></br></br><p>WelcometoWORBLI!</p><p>Clickthebuttonbelowtoconfirmyouremail.</p><ahref="https://portal-b.worbli.io/dashboard/profile/${newjwt}/"><buttontype="button"style="cursor:pointer;outline:none;font-weight:600;border-radius:3px;background-color:#37527A;border:none;color:white;padding:15px32px;text-align:center;text-decoration:none;display:inline-block;font-size:15px;width:250px">VerifyEmail</button></a></br></br><p>Ifyoucan'tconfirmbyclickingthebuttonabove,pleasecopytheaddressbelowtothebrowseraddressbartoconfirm.</p><ahref="https://portal-b.worbli.io/dashboard/profile/${newjwt}/">https://portal-b.worbli.io/dashboard/profile/${newjwt}/</a></br></br></br><p>Ifthisactivityisnotyourownoperation,pleasecontactusimmediatlyviasupport@worbli.io</p></td></tr></table></td></tr></table></body></html>`
        } else if (template === 'welcome') {
            var htmlEmail = `<!DOCTYPEhtmlPUBLIC"-//W3C//DTDXHTML1.0Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><htmlxmlns="http://www.w3.org/1999/xhtml"><head><metahttp-equiv="Content-Type"content="text/html;charset=UTF-8"/><title>[WORBLI]EmailConfirmation</title><metaname="viewport"content="width=device-width,initial-scale=1.0"/></head><bodystyle="margin:0;padding:0;background-color:#F7F7F7;min-height:100vh"><tablestyle="margin:0;padding:60px;background-color:#F7F7F7;"cellpadding="0"cellspacing="0"width="100%"><tr><tdstyle="text-align:center"><imgsrc="https://www.dac.city/esm-bundled/images/email-logo.png"width="200px"style="margin-bottom:20px;"><tablestyle="margin:0;padding:60px;background-color:#FFFFFF;text-align:left;border-radius:0.4em;"cellpadding="0"cellspacing="0"width="100%"><tr><td><b>WelcometoWORBLI</b></td></tr><tr><td></br></br></br><p>Hello:</p><p>Wehavedetectedyouhaveloggedinforthefirsttimeandwantedtowelcomeyou!</p><p>Ifthisactivityisnotyourownoperation,pleasecontactusimmediatlyviasupport@worbli.io</p></td></tr></table></td></tr></table></body></html>`
        }
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
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    })
}


module.exports = { send_email };