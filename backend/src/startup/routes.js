const express = require('express');
const morgan = require('morgan');
const users = require('../routes/users');
const login = require('../routes/login');
const packages = require('../routes/packages');
const dashboard = require('../routes/dashboard')
const {router} = require('../routes/email');
const email = router // getting routes from "email" module
const payments = require('../routes/payments');
const subscribe = require('../routes/subscribe');
const password = require('../routes/password');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json()); // to be able to parse req json object to endpoint
    app.use('/api/packages', packages);
    app.use('/api/users', users);
    app.use('/api/login', login);
    app.use('/api/dashboard', dashboard)
    app.use('/api/email', email);
    app.use('/api/payments', payments);
    app.use('/api/subscribe', subscribe);
    app.use('/api/password', password);

    // Error handling middleware function

    app.use(error);
    }