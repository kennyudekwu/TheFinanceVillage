const config = require('config');
const nodemailer = require('nodemailer');
// const fetch = require('node-fetch');

// Google Mailing Parameters
const client_id = config.get('client_id');
const client_secret = config.get('client_secret');
const refresh_token = config.get('refresh_token');
const redirect_uri = config.get('redirect_uri');

const {google} = require('googleapis');



// Creating App Client to carry out the mail-sending procedure
const OAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

/*
    Making known the API and email address (via the refresh token) used to send the
    mail already known to the system
*/
OAuth2Client.setCredentials({refresh_token: refresh_token});



async function sendingMail (msg, handlebarOptions = null) {
    const accessToken = await OAuth2Client.getAccessToken();

    // Mail sender details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'kennyudekwu@gmail.com',
            clientId: client_id,
            clientSecret: client_secret,
            refreshToken: refresh_token,
            accessToken: accessToken
        }
    });

    // check to see if the mail to be sent is a template of a normal mail
    if (handlebarOptions) {
        const hbs = require('nodemailer-express-handlebars');
        transporter.use('compile', hbs(handlebarOptions));
    }

    const mail = await transporter.sendMail(msg);
    return mail;

}


module.exports.sendingMail = sendingMail;