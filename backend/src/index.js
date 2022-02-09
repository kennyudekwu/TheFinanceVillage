require('express-async-errors');

const winston = require('winston');
const express = require('express');
const app = express();


require('./startup/routes')(app);

require('./startup/dbstart')();

require('./startup/logging')();

require('./startup/config')();

app.get('/api', (req, res)=>{
    res.send('Welcome to Finance Village API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));