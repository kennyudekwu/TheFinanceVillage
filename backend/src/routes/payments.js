const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const config = require('config');
const { Package } = require('../models/packages');
const { User } = require('../models/users');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

router.get('/subscription-payment', async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(401).send('Access denied. No token provided.')
    let user = {};
    try{
    // console.log(token); debugger
      const decoded = jwt.verify(token, config.get('jwtPrivateKey')); // Returns the json payload after the token has been decoded
      user = decoded;
    }
    catch(ex){
        return res.status(400).send('Invalid token.');
    }

    user = await User.findById(user._id).select('-password');
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

router.get('/verify-subscription-callback', async(req, res) => {
    const ref = req.query.reference;
    verifySub(ref).then(response => response.json())
                    .then(async payload => {
                                        if (payload.data.status === 'success') {
                                            const user = await User.findOne({email: payload.data.customer.email});
                                            user.is_subscribed = true;
                                            return user.save()
                                        } else {
                                              // render transaction failed page
                                              // or redirect to dashboard
                                            return 'Failed transaction';
                                        }})
                                      // redirect to dashboard
                                    .then(customer => res.status(200).send(customer));

});

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
}

async function verifySub (ref) {
    // paystack's transaction verification endpoint
    return await fetch(`https://api.paystack.co/transaction/verify/${ref}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.get('paystack_key')}`
            }
            });
}

module.exports = router;