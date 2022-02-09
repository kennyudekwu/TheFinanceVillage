const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _= require('lodash');
const {User, validateUser} = require('../models/users');
const {Package, validatePckage} = require('../models/packages');
const express = require('express');
const jwt = require('jsonwebtoken');
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
    const salt = bcrypt.genSaltSync(10);

    user.password = await bcrypt.hashSync(user.password, salt);

    const emailToken = jwt.sign({email, password},
        config.get('emailTokenKey'));

    user.email_token = emailToken;

    user.referral_id = await idGeneration(user);
    await user.save();

    const token = user.generateAuthToken();

    // Sending email by calling endpoint for verification link
    sendMail(email, token).then(response => response.json())
                    .then(data => {
                    // Frontend checks "sentEmailVerificationLink" property
                    // before displaying "email sent" modal
                        res.header('x-auth-token', token).send(data);
                    }).catch( err => {
                        res.header('x-auth-token', token).send(user);
                        console.error('Error: ', err);
                    });

});

// Recursive function to check for already existing unique 'referral_id's in the database
async function idGeneration(user) {
    let ref_code = user.generateReferralCode();
    const user_exist = await User.findOne({referral_id: ref_code});
    if (user_exist) idGeneration();
    return ref_code[0];

}

async function sendMail (email_param, email_token) {
    // using 'fetch' to GET from mail-sending endpoint
    return await fetch(config.get('send_email'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email_param, token: email_token})
            });

}


module.exports = router;