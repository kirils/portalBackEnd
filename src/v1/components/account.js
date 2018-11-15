const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
const fetch = require('node-fetch'); 
const rpc = new JsonRpc('https://endpoint-1.worbli.io', { fetch });

const AWS = require('aws-sdk');
AWS.config.update({ "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, "region": "us-east-1" });
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

function create_account(data) {
    return new Promise(function(resolve, reject) {
        if(data && data.worbli_account_name && data.public_key_active && data.public_key_owner){
            const accountRequest = data;
            const params = {
                MessageBody: JSON.stringify(accountRequest),
                QueueUrl: "https://sqs.us-east-1.amazonaws.com/373953752322/new-accounts"
            };
            sqs.sendMessage(params, function(err, data) {
                if (err) {
                    reject("Error", err);
                } else {
                    resolve(data.MessageId);
                }
            });
        }
    })
}


function check_exists(worbli_account_name) {
    return new Promise((resolve, reject) => {
        rpc.get_account(worbli_account_name)
        .then((data) => resolve(true))
        .catch((err) => resolve(false))
    })
}

module.exports = { create_account, check_exists };
    