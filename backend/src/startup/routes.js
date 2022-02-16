const express = require('express');
const morgan = require('morgan');
const users = require('../routes/users');
const auth = require('../routes/auth');
const packages = require('../routes/packages');
const email = require('../routes/email');
const payments = require('../routes/payments');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(morgan('tiny'));
    app.use(express.json());
    app.use('/api/packages', packages);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/email', email);
    app.use('/api/payments', payments);

    // Error handling middleware function

    app.use(error);
    }