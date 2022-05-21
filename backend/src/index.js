require('express-async-errors');
const morgan = require('morgan');
const winston = require('winston');
const express = require('express');
const app = express();
const sslRedirect = require('heroku-ssl-redirect').default;

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
} else {
    app.use(sslRedirect())
}; // enable ssl redirect

require('./startup/routes')(app);

require('./startup/dbstart')();

require('./startup/logging')();

require('./startup/config')();

app.get('/api', (req, res)=>{
    res.send('Welcome to Finance Village API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));