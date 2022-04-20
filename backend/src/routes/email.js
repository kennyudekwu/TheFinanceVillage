const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const {sendingMail} = require('../email_content/sendMailFunction');

// Using another import convention to spice things up a lil
// import generatorTemplate from '../email_content/emailTemplateGenerator';
// to use the above ES6 technique, we have to add "type":"module" to 'package.json'

const generatorTemplate = require('../email_content/emailTemplateGenerator');

router.get('/send-link', auth,  async(req, res) => {
    const token = req.header('x-auth-token');

    let user = await User.findById(req.user._id).select('-password');

    if (!user) return res.status(400).send('User does not exist');
    if (user.sentEmailVerficationLink === true) return res.status(400).send('Link already sent');

    // Generate email verification link to be sent to the user
    const options = generatorTemplate('Finance Village <kennyudekwu@gmail.com>',
    user.email, user.first_name,
    `http://${req.headers.host}/api/email/verify-email?token=${token}`);

    const mailOptions = options[0];
    const handlebarOptions = options[1];

    // const mailOption = {
    //     from: 'Finance Village <kennyudekwu@gmail.com>',
    //     to: user.email,
    //     subject: 'Email Verification',
    //     text: `
    //         ${user.first_name}, thanks for registering on our platform
    //         Please verify your email to continue...
    //         Go to the below url to verify your email address
    //         http://${req.headers.host}/api/email/verify-email?token=${token}
    //         `,
    //     html: `
    //         <h2>${user.first_name}, thanks for registering on our platform</h2>
    //         <h4>Please verify your email to continue...</h4>
    //         <a href="http://${req.headers.host}/api/email/verify-email?token=${token}">Click here to verify your email</a>
    //         `
    // };

    sendingMail(mailOptions, handlebarOptions).then(async (mail) => {
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
    let user = await User.findOne({email_token: req.query.token});
    if (!user) return res.status(400).send('Invalid token');
    // return redirection to home page afterwards when home html is completed

    user.email_token = null;
    user.is_verified = true;
    user = await user.save();

    // render email verify success page only. Do not send any mail stating email has been verified
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

        // display 'verification successful page'
        // redirect to payment page with the token in the header


    // if there is a mail-sending ish, do the needful but still display success page
    sendingMail(mailOption).then(() => {
        console.log("Error after the mailing function...")
        // initializePayment(req.query.token);
        // res.header('x-auth-token', req.query.token);
        // display email verification success page and wait for 2.5 seconds before redirecting
        res.redirect(`http://${req.headers.host}/api/payments/subscription-payment?token=${req.query.token}`);
    }).then(() => res.status(200));

})



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


module.exports.router = router;
