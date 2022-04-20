const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {User} = require('../models/users');
const express = require('express');
const router = express.Router();
const emailCheck = require('../middleware/emailCheck');

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('Invalid email');

    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return res.status(401).send('Invalid password');

    // add expiry period to token to simulate session
    const token = user.generateAuthToken();

    res.header('x-auth-token', token)
    // .send(user);
    // dashboard endpoint will handle returning user data
  });

  function validateUser(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
  }

module.exports = router;