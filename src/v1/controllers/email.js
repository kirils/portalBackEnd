const userModel = require('../models/user.js')
const jwt = require('../components/jwt.js');

function post_authorize(req, res) {
    const email = req.body.email;
    const agreed_terms = req.body.agreed_terms;
    const agreed_marketing = req.body.agreed_marketing;
    userModel({email, agreed_terms, agreed_marketing}).save((err) => {
        if (!err) {
            console.log('saved');
            const jwt = jwt.jwt_sign({email});
            console.log(jwt)
                //TODO: Make JWT
                //TODO: Send Email with jwt in the right remplate
        } else {
            console.log('not saved');
            // TODO find the email in the database
            // make jwt
            // send email with jwt in the right remplate
        };
  });





    res.status(200).json({data: "pass"})
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
