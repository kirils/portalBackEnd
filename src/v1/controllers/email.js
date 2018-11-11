const userModel = require('../models/user.js')
const jwt = require('../components/jwt.js');
const emailsender = require('../components/email.js');

function post_authorize(req, res) {
    const email = req.body.email;
    const agreed_terms = req.body.agreed_terms;
    const agreed_marketing = req.body.agreed_marketing;
    userModel({email, agreed_terms, agreed_marketing}).save((err, data) => {
        if (!err && data) {
            console.log('no error')
            const mongo_id = data[0]._id;
            const newjwt = jwt.jwt_sign({email, mongo_id});
            emailsender.send_email(email, newjwt, 'authorize')
            .then(() => {
                res.status(200).json({data: true})
            })
            .catch(() => {
                res.status(400).json({data: false})
            })
        } else {
            console.log('error')
            userModel.find({email},(err, data) => {
                if (!err && data) {
                    const mongo_id = data[0]._id;
                    const email = data[0].email;
                    console.log(mongo_id)
                    const newjwt = jwt.jwt_sign({email, mongo_id});
                    emailsender.send_email(email, newjwt, 'authorize')
                    .then(() => {
                        res.status(200).json({data: true})
                    })
                    .catch(() => {
                        res.status(400).json({data: false})
                    })
                } else {
                    res.status(400).json({data: false}) 
                }
            })
        };
  });
}

function post_welcome(req, res) {
    console.log(req.body)
    res.json(true)
}
function post_reset(req, res) {
    console.log(req.body)
    res.json(true)
}
function post_add(req, res) {
    console.log(req.body.email);
    //TODO: Save email to database
    res.json({data: 'pass'})
}

module.exports = { post_authorize, post_welcome, post_reset, post_add};
