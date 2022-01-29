const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    const db = config.get('db');
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true
        }).then(() => {
            console.log(`Database connected successfully to ${db}`);
            winston.info(`Database connected successfully to ${db}`);
        });

}