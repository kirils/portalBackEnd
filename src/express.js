const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const routes = require('./router.js');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const corsOptions = {
    origin: process.env.FRONT_END_URL,
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
}

const app = express();
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors()); //corsOptions
app.use('/', routes);

module.exports = app;