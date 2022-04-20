const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const { number, required } = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const voucher_codes = require('voucher-code-generator');

const userSchema = new mongoose.Schema({
loggedIn: {
    type: Boolean,
    default: false
},

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
    type: String
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

date_of_birth: {
    type: Date,
    required: true
},

occupation: {
    type: String,
    required: true
},

password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
},

bank_account_number: {
    type: String,
    minlength: 10,
    maxlength: 10
},

address: {
    type: String,
    minlength: 5
},

referral_id: String,

number_referred: {
    type: Number,
    default: 0
},

// add referred members, embedded document

net_referral_income: {
    type: Number,
    default: 0
},

reference : {
    type: new mongoose.Schema({
        first_name: {
            type: String,
            minlength: 3,
            maxlength: 50
        },
        last_name: {
            type: String,
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            minlength: 5,
            maxlength: 255
        },
        referral_id: String
    })

},

created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },

package: {
    /*
    referencing is used to ensure data consistency because the
    price or/and name of the package can be changed by admin

    in package GET endpoint, validate the object id first before proceeding
    to returning the users paid package.
    */
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
},

courses: {

    // Array of the different course objectId(s) paid for
    // this is a hybrid of embedded and referenced
    type: [new mongoose.Schema({
        // pass id of the course when storing which reflects the actual id
        // of the course stored on the "courses" db

        /*
        In the courses GET endpoint, the courses as well as their embedded
        contents, each having a unique id will be returned. This id value
        aids tracking of a users progress on the course.

        Course model must contain:
        name: string
        content: array of objects with 'id' and 'content' as properties
        */



        // name won't be returned

        // corresponds to the video 'id' completed by the user
        completed: {
            type: [Number],
            default: [],
            required: true
        }
        })]
},

events: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
},

// add events here - referencing relational model

sent_email_link: {
                        type: Boolean,
                        default: false,
                        required: true
},

video_completion: {
                type: Boolean,
                default: false,
                required: true
},

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
        phone_number: Joi.string().pattern(/^[0-9]+$/)
                        .min(4).max(20).required(),
        reference: Joi.string(),
        country: Joi.string().min(2).max(40).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)
                    .required(),
        package: Joi.string().required(),
        date_of_birth: Joi.date(),
        occupation: Joi.string().required()
    })

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;