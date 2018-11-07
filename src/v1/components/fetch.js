var unirest = require('unirest');

function fetch_data(data) {
    return new Promise(function(resolve, reject) {
        const url = data.url;
        const method = data.method;
        const headers = data.headers;
        const body = data.body;
        unirest[method.toLowerCase()](url).headers(headers).send(body)
        .end((response) => {
            if(response && response.body) {
                resolve(response.body);
            } else {
                reject('fetch data error');
            }            
        });
    })
}

module.exports = { fetch_data };
