const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const config = require('config');
const nodemailer = require('nodemailer');
// const fetch = require('node-fetch');

// Google Mailing Parameters
const client_id = config.get('client_id');
const client_secret = config.get('client_secret');
const refresh_token = config.get('refresh_token');
const redirect_uri = config.get('redirect_uri');

const {google} = require('googleapis');
const { User } = require('../models/users');


// Creating App Client to carry out the mail-sending procedure
const OAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

/*
    Making known the API and email address (via the refresh token) used to send the
    mail already known to the system
*/
OAuth2Client.setCredentials({refresh_token: refresh_token});

router.get('/send-link', auth,  async(req, res) => {
    const token = req.header('x-auth-token');

    let user = await User.findById(req.user._id).select('-password');

    if (!user) return res.status(400).send('User does not exist');
    else if (user.sentEmailVerficationLink === true) return res.status(400).send('Link already sent');

    // Generate email verification link to be sent to the user
    const mailOption = {
        from: 'Finance Village <kennyudekwu@gmail.com>',
        to: user.email,
        subject: 'Email Verification',
        text: `
            ${user.first_name}, thanks for registering on our platform
            Please verify your email to continue...
            Go to the below url to verify your email address
            http://${req.headers.host}/api/email/verify-email?token=${token}
            `,
        html: `
            <h2>${user.first_name}, thanks for registering on our platform</h2>
            <h4>Please verify your email to continue...</h4>
            <a href="http://${req.headers.host}/api/email/verify-email?token=${token}">Click here to verify your email</a>
            `
    };

    sendingMail(mailOption).then(async (mail) => {
        // declaring the format of response data
        const result = {};
        user.sent_email_link = true;
        user.email_token = token;
        user = await user.save();

        // filter 'email_token' and some other irrelevant or classified info before sending 'user' response
        result.user = user;
        result.mail = mail;

        res.send(result);
        // console.log(result); - debugger

        // If error, error middleware will handle it
    });

    /* (email-sending error is the only error from here**)
    **even if there's any other error other than the 'email error', so far
    as the email doesn't get sent by the end of the day, frontend should
    return same pop-up

    if error is encountered in sending the mail, frontend can just pop up
    the modal stating that verification email hasn't been successfully
    sent and ask that they try again later
    */

});

router.get('/verify-email', async (req, res) => {
    const user = await User.findOne({email_token: req.query.token});
    if (!user) return res.status(400).send('Invalid token');
    // return redirection to home page afterwards when home html is completed

    user.email_token = null;
    user.is_verified = true;
    uaer = await user.save();

    // render email verify success page
    const mailOption = {
        from: 'Finance Village <kennyudekwu@gmail.com>',
        to: user.email,
        subject: 'Email Verified Successfully',
        text: `
            ${user.first_name}, thanks once again for registering on our platform
            Please click on the link to login...
            "link should be here"
            `,
        html: `
            <h2>${user.first_name}, thanks once again for registering on our platform</h2>
            <h4>Please click on the link to login...</h4>
            <a href="link should be here">Click here to verify your email</a>
            `
    };

        //display 'verification successful page'
        // redirect to payment page with the token in the header


    // if there is a mail-sending ish, do the needful but still display success page
    sendingMail(mailOption).then(() => {
        // initializePayment(req.query.token);
        // res.header('x-auth-token', req.query.token);
        // display email verification success page and wait for 2.5 seconds before redirecting
        res.redirect(`http://${req.headers.host}/api/payments/subscription-payment?token=${req.query.token}`);
    }).then(() => res.status(200));

})

async function sendingMail (msg) {
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

    const mail = await transporter.sendMail(msg);
    return mail;

}

// async function initializePayment (token) {
//     // using 'fetch' to GET from payment endpoint
//     return await fetch(config.get('payment_gateway'), {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token
//         }
//         });
// }


module.exports = router;