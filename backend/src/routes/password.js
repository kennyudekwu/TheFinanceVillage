const config = require('config');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const {sendMail} = require('./email');

const {User} = require('../models/users');

// send link to user's email
router.post('/reset-link', async(req, res) => {
    const user = await User.findOne({email: req.body.email}).select('-password');

    if (!user) return res.status(400).send('User does not exist');
    const token = jwt.sign({ email: user.email }, config.get('jwtPrivateKey'))
    // use email endpoint to send mail

    const mailOption = {
        from: 'Finance Village <kennyudekwu@gmail.com>',
        to: user.email,
        subject: 'Password-reset',
        text: `
            ${user.first_name}, click on the link below to reset your password
            http://${req.headers.host}/api/password/reset-password?token=${token}
            `,
        html: `
            <h2>${user.first_name}, click on the link below to reset your password</h2>
            <a href="http://${req.headers.host}/api/password/reset-password?token=${token}">Click here to change your password</a>
            `
    };

    sendMail(mailOption).then( mail => {
        // debugging purposes. Remove when done
        res.send(mail)
    })

})

// link containing tokenized email of user
router.get('/reset-password', async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(401).send('Access denied. No token provided.')

    try{
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      const email = decoded;
      // render password update form with email above as template "email" value
      // PUT verb endpoint below will handle the update
    }
    catch(ex){
        res.status(400).send('Invalid token.');
    }

})

// endpoint to update user's password on the db
router.put('/reset-password', async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(401).send('Access denied. No token provided.')

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        const email = decoded;

        const salt = bcrypt.genSaltSync(10);
        const {error} = validatePassword(req.body);

        if (error) return res.status(400).send(error.details[0].message);
        const password = await bcrypt.hashSync(req.body.password, salt);

        // email token comes as a query parameter for security purposes
        await User.findOneAndUpdate({email: email}, {
            $set:{
                password: password
            }
        }, { new : true });
        }
    catch(ex){
        res.status(400).send('Invalid token.');
    }

})

function validatePassword (passwordBody) {
    const schema = Joi.object({
        password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)
                    .required()
    })

    return schema.validate(passwordBody);
}

module.exports = router;