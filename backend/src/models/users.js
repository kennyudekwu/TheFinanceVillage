const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const { number } = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const voucher_codes = require('voucher-code-generator');

const userSchema = new mongoose.Schema({
first_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
},

last_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
},

email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
},

email_token: {
    type: String,
    required: true
},

is_verified: {
    type: Boolean,
    default: false
},

is_subscribed: {
    type: Boolean,
    default: false
},

phone_number: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20
},

country: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
},

password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
},

referral_id: String,

number_referred: {
    type: Number,
    default: 0
},

net_referral_income: {
    type: Number,
    default: 0
},

reference : {
    type: new mongoose.Schema({
        first_name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        last_name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            unique: true,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        referral_id: String
    }),

},

created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },

package: {
    type: new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        price: {
            type: Number,
            required: true
        },
        plan_code: String
    }),
    required: true
},

courses: {
    type: new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        description: {
            type: String,
            required: true
        }
        })
},

video_completion: Boolean,

isAdmin: Boolean
});

// Creating a method "generateAuthToken()" for objects created off this model
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

userSchema.methods.generateReferralCode = function() {
    return voucher_codes.generate({length: 8})
}

const User = mongoose.model('User', userSchema);

function validateUser (user) {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(40).required(),
        last_name: Joi.string().min(2).max(40).required(),
        email: Joi.string().min(5).max(255).required().email().required(),
        phone_number: Joi.string()
                      .pattern(new RegExp('^[0-9+]$'))
                      .min(4).max(20).required(),
        reference: Joi.string().required(),
        country: Joi.string().min(2).max(40).required(),
        password: Joi.string()
                  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        package: Joi.string().required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;