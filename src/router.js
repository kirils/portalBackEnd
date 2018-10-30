const express = require('express');

const registerUserRoutes = require('./routes/registerUser.js');
const securityCodeRoutes = require('./routes/securityCode.js');
const snapShotsRoutes = require('./routes/snapShot.js');
const createAccountRoutes = require('./routes/createAccount.js');
const sendEmailRoutes = require('./routes/sendEmail.js');
const profileRoutes = require('./routes/profile.js');
const loginRoutes = require('./routes/login.js');

const router = express.Router();

router.get('/', (req, res) => res.send('WORBLI API'))

router.get('/api/v1', (req, res) =>
  res.json({
    api_version: '1',
    location: '/',
    server_time: new Date().getTime(),
    endpoints: {
      '/register' : 'register a new worbli account',
      '/security-code/' : 'Create a new security code',
      '/security-code/8945830948594850450123' : 'Lookup a security code',
      '/snap-shot/username' : 'Lookup an account by main net username',
      '/send-email/validate/email' : 'Send an email verification email',
      '/send-email/welcome/email' : 'Send an email verification email',
      '/profile' : 'get and post a users profile',
      '/login' : 'log a user in',
    }
  })
);

router.use('/api/v1/register-user', registerUserRoutes);
router.use('/api/v1/security-code', securityCodeRoutes);
router.use('/api/v1/snap-shot', snapShotsRoutes);
router.use('/api/v1/create-account', createAccountRoutes);
router.use('/api/v1/send-email', sendEmailRoutes);
router.use('/api/v1/profile', profileRoutes);
router.use('/api/v1/login', loginRoutes);

module.exports = router;