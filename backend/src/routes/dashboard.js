const auth = require('../middleware/auth');
const {User} = require('../models/users');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) return res.status(400).send('User does not exist');

    res.send(user);
});

module.exports = router