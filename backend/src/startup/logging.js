const winston = require('winston');
const config = require('config');
const db = config.get('db');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
// To control transport to store specific unhandled error
winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
    new winston.transports.MongoDB({
        db: db,
        // How to just log errors in mongo, not store debug messages or info messages
        // Although, by default, only the errors would be stored
        level: 'info'
    })
);

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: db,
    // How to just log errors in mongo, not store debug messages or info messages
    // Although, by default, only the errors would be stored
    level: 'info'
}));
}