const express = require('express');
const router = express.Router();
const config = require('config');
const { Package } = require('../models/packages');
const { User } = require('../models/users');
const { Course } = require('../models/courses');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

router.get('/subscription-payment', async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(401).send('Access denied. No token provided.')
    let user = {};
    try {
    // console.log(token); debugger
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); // Returns the json payload after the token has been decoded
        user = decoded;
    }
    catch(ex) {
        return res.status(400).send('Invalid token.');
    }

    user = await User.findById(user._id).select('-password');
    if (!user) return res.status(401).send('Invalid user');
    // console.log(user);

    let {price, plan_code} = await Package.findById(user.package);
    // console.log(plan_code)
    // 'price' is redundant as the subscription plan has a default price attached to it

    subscribe(user.email, price, plan_code).then(response => response.json())
                                    .then(payload => {
                                        // console.log(payload);
                                        res.redirect(payload.data.authorization_url)});
                                      // if error, let middleware handle it

});

router.post('/courses-payment', async (req, res) => {
    const {email} = User.findOne({email: req.body.email});
    const course = Course.findOne({name: req.body.course});

    // place course on pending first

    charge(email, course.price).then(response => response.json())
                                .then(payload => {
                                // console.log(payload);
                                res.redirect(payload.data.authorization_url)});
                                // if error, let middleware handle it
});

// create endpoint for verifying course payment
// should be able to update user with the paid course

router.get('/verify-callback', async(req, res) => {
    const ref = req.query.reference;
    verify(ref).then(response => response.json())
                    .then(async payload => {
                        // presence of plan property makes for
                        // handling subscriptions
                        if (payload.data.plan) {
                            const user = await User.findOne({email: payload.data.customer.email});
                            if (!user) return res.status(400).send('Invalid user'); // this would be handled by the 'then' block
                            if (payload.data.status === 'success') {
                                user.is_subscribed = true;
                                // redirect user back to home page
                                return user.save();
                            } else {
                                // use the timeout function to render the unsuccessful page for some seconds
                                // that states that shortly the user will be redirected to his/her dashboard then
                                // run timeout function here
                                return user;
                            }
                        }
                        // another property should mark how "course" charges
                        // updating and adding course to user document correspondingly
                        // should be verified and handled for each user
                        })
                        // redirect to dashboard
                        .then(async () => {
                            // generate token from 'login' endpoint first
                            // send token to frontend who will then call "dashboard"
                            // for the users's data before passing to the
                            // template engine
                            return await automaticLogin(user.generateAuthToken());
                            // we don't care about the result. The token being sent will always
                            // be genuine because it's being generated from a valid user document if
                            // and only if the user document exist
                        });
                        // if something causes the system to throw an error that hasn't been addressed
                        // create a "something failed" page or use your already defined error middleware
                        // handler the returns plainly "Something failed"
});

/*
    if discount is to be implemented, transact first to implement discount then
    implement the subscription endpoint of paystack for the transacted user if
    he has a "referral"
*/

async function subscribe (email, amount, plan) {
    // paystack's transaction initiation endpoint
    return await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.get('paystack_key')}`
            },
            body: JSON.stringify({
                email: email,
                amount: amount,
                plan: plan
            })
            });
};

// course payment handler in progress
async function charge (email, amount) {
    // paystack's transaction initiation endpoint
    return await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.get('paystack_key')}`
            },
            body: JSON.stringify({
                email: email,
                amount: amount
            })
            });
};

async function verify (ref) {
    // paystack's transaction verification endpoint
    return await fetch(`https://api.paystack.co/transaction/verify/${ref}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.get('paystack_key')}`
            }
            });
};

async function automaticLogin (ref) {
    // frontend's automatic login endpoint
    return await fetch(`http://${req.headers.host}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
            });
};

module.exports = router;
// export payment module (charge and verify) in order to allow for usability by the "events" and possibly
// "webinars" routers, to allow users pay for events and webinars