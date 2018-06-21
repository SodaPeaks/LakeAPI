const express = require('express');
const morgan = require('morgan');
const app = express();
const errorHandler = require('./util/error-handler');
require('./models/register-plugins');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

const auth = require('./routes/auth');
const lakes = require('./routes/lakes');
const users = require('./routes/users');

app.use('/auth', auth);
app.use('/lakes', lakes);
app.use('/users', users);

app.use(errorHandler());

module.exports = app;