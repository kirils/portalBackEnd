const jwt = require('../components/jwt.js');
const loggerModel = require('../models/log.js')

function post_log(req, res){
  const token = req.body.token;
  let data = req.body.data || {};
  const browser = req.body.browser;
  const created_at = req.body.created_at;
  const from = 'front end'
  const action = req.body.action;
  if(token){
    jwt.jwt_decode(token)
    .then((jwt_data) => {
      if (jwt_data && jwt_data.email){
        const email = jwt_data.email;
        data.jwt_token = token;
        data.jwt_data = jwt_data;
        const str_data = JSON.stringify(data);
        return save_log({email, data: str_data, browser, created_at, action, from})                
      }
    })
    .then((data) => {
      res.status(200).json({data: true})
    })
    .catch((err) => {
      res.status(400).json({data: false, error: err})
    })
  } else if (data && data.email){
    const email = data.email;
    const str_data = JSON.stringify(data);
    save_log({email, data: str_data, browser, created_at, action, from})
    .then(() => {
      res.status(200).json({data: true})
    })
    .catch((err) => {
      res.status(400).json({data: false, error: err})
    }) 
  } else {
      res.status(400).json({data: false})
  }
}

function save_log(data){
  return new Promise(function(resolve, reject) {
    loggerModel(data).save((err, data) => {
      if (!err && data) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

module.exports = { post_log };


