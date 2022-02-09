const User = require('../models/users');

module.exports = async function emailCheck (req, res, next) {
    const user = await User.findOne({email: req.body.email});
    if (!user.is_verified) {
        // send-mail api is called to send the mail again after a button is clicked by the user
        if (!user.sent_email_link) return res.status(400).send('Link not sent');
        else return res.status(400).send('Account not verified');
        // redirect 'home' after the else
    }
    return next();
}