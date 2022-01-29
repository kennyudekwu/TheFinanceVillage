const mongoose = require('mongoose');
const Joi = require('joi');
const { string } = require('joi');

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
    discount: Number,
    plan_code: String
}));

function validatePackage (package) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        discount: Joi.number().min(0.01).max(1),
        plan_code: Joi.string().required(),
    });

    return schema.validate(package);
}

module.exports.Package = Package;
module.exports.validatePackage = validatePackage;