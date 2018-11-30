'use strict';
require('dotenv').config()
const mongoose = require('mongoose');
const app = require('./src/express.js');
Promise = require('bluebird'); 
mongoose.Promise = Promise;

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DB_NAME}`);
});

app.listen(process.env.API_PORT, () => {
  console.info(`API started on port ${process.env.API_PORT}`);
});

module.exports = app;