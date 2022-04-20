const {Subscriber, validateSubscriber} = require('../models/subscribers');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => { // add auth and admin middleware
    const {error} = validateSubscriber(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Prevent duplicates
    let subscriber = await Subscriber.findOne({email: req.body.email});
    if (subscriber) return res.status(400).send("You are already subscribed");

    subscriber = new Subscriber(req.body);

    const result = await subscriber.save();

    res.send(result);

});

module.exports = router;