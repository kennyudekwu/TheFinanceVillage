const mongoose = require('mongoose');
const Joi = require('joi');

const Course = new mongoose.model('Course', new mongoose.Schema({
    course_img: String, // course image to display hosted on public s3 bucket
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
    // storing the different videos attributed to a particular course
    // as well as the different ids associated with the different videos
    // to enable tracking user progress
    content: {
        type: [new mongoose.Schema({
                    // 'video_id' will be generated automatically
                    // by mongodb for each subdocument (video) stored
                    name: { // name of the individual videos
                        type: String,
                        required: true
                    },
                    video_url: {
                            type: String,
                            required: true
                    }
                })],
        default: [],
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
}));

function validateCourse (course) {
    const schema = Joi.object({
        course_img: Joi.string(),
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        content: Joi.array().items(Joi.string())
                .required(),
        discount: Joi.number().min(0.01).max(1), // 1% - 100% discount range
        video_content_id: Joi.array()
                            .items(Joi.number())
                            .required(),
    });

    return schema.validate(course);
}

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;