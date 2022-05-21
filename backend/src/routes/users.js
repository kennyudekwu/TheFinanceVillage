const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _= require('lodash');
const {User, validateUser} = require('../models/users');
const {Subscriber} = require('../models/subscribers');
const {Package} = require('../models/packages');
const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/register', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {email, password} = req.body;

    // Prevent duplicates
    let user = await User.findOne({email});
    if (user) return res.status(400).send('User already registered');

    const package = await Package.findOne({name: req.body.package});
    const inc_value = package.price*package.discount;
    req.body.package = package._id;

    // Check if referred by someone and store culminated referee bonus and amount referred
    if (req.body.reference) {

        try {
            const ref = await User.findOneAndUpdate({referral_id: req.body.reference},
                {
                    $inc : {
                        number_referred: +1,
                        net_referral_income: +inc_value
                    }
                }, {new: true});

            req.body.reference = _.pick(ref, ['_id', 'first_name', 'last_name',
                                'email', 'referral_id']);

        }
        catch (error) {
                return res.status(400).send('Non-existent referral detected');
        }

    }

    user = new User(req.body);

    const subscriber = await Subscriber.findOne({email: user.email});
    if (subscriber) user.is_subscribed_to_newsLetter = true;

    const salt = bcrypt.genSaltSync(10);

    user.password = await bcrypt.hashSync(password, salt);

    user.referral_id = await idGeneration(user);
    await user.save();

    const token = user.generateAuthToken();

    // Sending email by calling endpoint for verification link
    sendMail(token).then(response => response.json())
                // do not reveal the entire data. Only the dashboard endpoint and the login
                // endpoint does so.
                .then(data => {
                    // Frontend checks "sent_email_link" property
                    // before displaying "email sent" modal

                        // res.header('x-auth-token', token).send(data);
                        // 'data' contains information about the mail as well as
                        // the user object where frontend can then check if the
                        // mail was sent via the "sent_email_link" property
                        res.send(data.user.sent_email_link);
                    }).catch( err => {
                        // res.header('x-auth-token', token).send(user);

                        // this is here in case the link never gets sent.
                        // frontend can still use this information on the
                        // users dashboard. If the user wants the email to
                        // be sent again, frontend would check the "sent_email_link" property
                        // to make sure the mail wasn't sent before before re-initiating
                        // another link-sending procedure with the mailing endpoint
                        res.send(user.sent_email_link);
                        // console.error('Error: ', err);
                    });

});


// Recursive function to check for already existing unique 'referral_id's' in the database
async function idGeneration(user) {
    let ref_code = user.generateReferralCode();
    const user_exist = await User.findOne({referral_id: ref_code});
    if (!user_exist) return ref_code[0];  // reverse base case for recursive call
    else return idGeneration(user);
}

async function sendMail (email_token) {
    // using 'fetch' to GET from mail-sending endpoint
    return await fetch(config.get('send_email'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': email_token
            }
            });
}


module.exports = router;