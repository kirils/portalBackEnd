const userModel = require('../models/user.js')
const jwt = require('../components/jwt.js');
const emailSender = require('../components/email.js');
const logger = require('../components/logger.js');
const onfido = require('../components/onfido.js');
var bigInt = require("big-integer");
var crypto = require('crypto');

function post_authorize(req, res) {
  onfido.create_applicant()
  .then((data) => {
    const onfido_id = data;
    const email = req.body.email;
    const agreed_terms = req.body.agreed_terms;
    const agreed_marketing = req.body.agreed_marketing;
    logger.log('create aplicant id', email,  {data})
    userModel.find({email},(err, data) => {
      if (!err && data && data[0] && data[0]._id) {
        const email = data[0].email;
        const onfido_status = data[0].onfido_status;
        const onfido_id = data[0].onfido_id;
        const newjwt = jwt.jwt_expires({email, onfido_status, onfido_id}, '72h');
        emailSender.send_email(email, newjwt, 'authorize')
        .then(() => res.status(200).json({data: true}))
        .catch(() => res.status(400).json({data: false}))
      } else {
        const onfido_status = 'default';
        const security_code = bigInt(Buffer.from(crypto.randomBytes(8)).toString('hex'), 16);
        userModel({email, agreed_terms, agreed_marketing, onfido_status, onfido_id, security_code}).save((err, data) => {
          if (!err && data) {
            const mongo_id = data._id;
            const newjwt = jwt.jwt_sign({email, onfido_status, onfido_id});
            emailSender.send_email(email, newjwt, 'authorize')
            .then(() => res.status(200).json({data: true}))
            .catch(() => res.status(400).json({data: false}))
          } else {
            res.status(400).json({data: false})
          }
        })
      }
    });
  })
  .catch((err)=>{
    console.log(err)
  })
}

function post_welcome(req, res) {
  console.log(req.body)
  res.json(true)
}

function post_reset(req, res) {
  const email = req.body.email;
  userModel.find({email},(err, data) => {
    if (!err && data && data[0] && data[0]._id) {
      const mongo_id = data[0]._id;
      const email = data[0].email;
      const onfido_status = data[0].onfido_status
      const newjwt = jwt.jwt_expires({email, mongo_id, onfido_status}, '72h');
      emailSender.send_email(email, newjwt, 'reset')
      .then(() => res.status(200).json({data: true}))
      .catch(() => res.status(400).json({data: false}))
    } else {
      res.status(200).json({data: true});
    }
  });
}

function post_add(req, res) {
  console.log(req.body.email);
  //TODO: Save email to database
  res.json({data: 'pass'})
}

module.exports = { post_authorize, post_welcome, post_reset, post_add};
