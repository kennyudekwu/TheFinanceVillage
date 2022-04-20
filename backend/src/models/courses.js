const mongoose = require('mongoose');
const Joi = require('joi');

const Course = new mongoose.model('Course', new mongoose.Schema({
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
    content: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    video_content_id: {
        type: [Number],
        default: [],
        required: true
    }
}));

function validateCourse (course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        content: Joi.string().required(),
        discount: Joi.number().min(0.01).max(1),
        video_content_id: Joi.array()
                            .items(Joi.number())
                            .required(),
    });

    return schema.validate(course);
}

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;