const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Package, validatePackage} = require('../models/packages');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', [auth, admin], async (req, res) => { // add auth and admin middleware
    const {error} = validatePackage(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Prevent duplicates
    let package = await Package.findOne({name: req.body.name});
    if (package) return res.status(400).send("Package already exist");

    let {name, interval, amount} = req.body;
    amount = amount*100; // converting the naira to kobo as per paystack's use case

    // this logic is enclosed in an IF block to prevent redundancy during
    // storage of a package already created via the admin interface on
    // paystack, translating to the package  having a 'plac_code' already
    if (!req.body.plan_code) {
        generatePlanCode(name, interval, amount).then(response => response.json()).then(payload => {
            req.body.plan_code = payload.data.plan_code;
        });
    }

    // package discount is embedded in the request body
    package = new Package(req.body);

    const result = await package.save();

    res.send(result);

});

// display all the available packages to the user
router.get('/', async (req, res) => { // add auth and admin middleware
    const packages = await Package.find().sort({name : 1}).select('-plan_code');
    res.send(packages);
});

// create endpoint for modifying packages already selected or stored for
// the different users
// scenerio - user, already registered with a particular package, decides
// to switch to another
// backend action - user document should be updated accordingly

// package 'plan_code' generator
async function generatePlanCode (name, interval, amount) {
    // paystack's subscription creation endpoint
    return await fetch('https://api.paystack.co/plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.get(paystack_key)}`
            },
            body: JSON.stringify({
                name: name,
                interval: interval,
                amount: amount
            })
            });
}

module.exports = router;