const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _= require('lodash');
const {User, validateUser} = require('../models/users');
const {Package, validatePckage} = require('../models/packages');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/register', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered');

    const package = await Package.findOne({name: req.body.package});
    const inc_value = package.price*package.discount;
    req.body.package = package;

    if (req.body.reference) {
        const ref = await User.findOne({referral_id: req.body.reference});

        new Fawn.Task().update('users',
         {referral_id: req.body.reference}, {
             // cross-check with mosh if this transaction syntax is correct.
             // The array method I mean...
             $inc : {
                        number_referred: +1,
                        net_referral_income: +inc_value
                    }
         });

         req.body.reference = _.pick(ref, ['_id', 'first_name', 'last_name',
                            'email', 'referral_id']);
    }

    user = new User(req.body);
    const salt = bcrypt.genSaltSync(10);

    user.password = await bcrypt.hashSync(user.password, salt);

    // Store before validating subscription payment

    // Check payment before doing this

    // Add remaining fields for verifying email before saving

    idGeneration().then(result => {
        const token = user.generateAuthToken();
        res.header('x-auth-token', token)
        .send(result);
    });

    const {email, password} = user;



});

async function idGeneration() {
    let ref_code = user.generateReferralCode();
    const user_exist = await User.findOne({referral_id: ref_code});
    if (user_exist) idGeneration();
    user.referral_id = ref_code;
    const result = await user.save();
    return result;
}