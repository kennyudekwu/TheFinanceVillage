require('express-async-errors');

const winston = require('winston');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));