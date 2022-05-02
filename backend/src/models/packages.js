const mongoose = require('mongoose');
const Joi = require('joi');

const Package = new mongoose.model('Package', new mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    interval: {
        type: String,
        required: true
    },
    plan_code: String
}));

function validatePackage (package) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        discount: Joi.number().min(0.01).max(1),
        interval: Joi.string().required(),
        // we'd want to use the returned plan_code from paystack's api
        // to then store the package on the db.
        // However, one can still store an already created plan (created
        // via paystakc's admin interface) on the db by simply calling the
        // POST endpoint to store the package
        plan_code: Joi.string().required()
    });

    return schema.validate(package);
}

module.exports.Package = Package;
module.exports.validatePackage = validatePackage;