const {Package, validatePackage} = require('../models/packages');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => { // add auth and admin middleware
    const {error} = validatePackage(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Prevent duplicates
    let package = await Package.findOne({name: req.body.name});
    if (package) return res.status(400).send("Package already exist");

    package = new Package(req.body);

    const result = await package.save();

    res.send(result);

});

module.exports = router;