const auth = require('../middleware/auth');
const {getFileStream, uploadFile} = require('../aws/s3'); // aws upload function
const admin = require('../middleware/admin');
const {Course, validateCourse} = require('../models/courses');
const {User} = require('../models/users');
const express = require('express');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = express.Router();
const mongoose = require('mongoose');

// handling files sent to the server before sending to s3
const multer = require('multer');
// middleware that would tempoararily store the file and retrun the path
// to the file which will be passed to the upload function that handles
// the upload magic 😉
const upload = multer({dest: 'uploads/'}) // where the file will be temporarily stored

// eliminating the file from the sever to free space utilities
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

// create and store courses done by the admin
// get video
// connect to s3 bucket to store video
// get video url from the bucket
// store url for the different videos for the particular course

// endpoint to store the video to bucket and generate video url
// video url is returned to the frontend as a metadata for the
// course's video to be stored on the db


router.post('/post-video', [auth, admin], upload.single('video'), // middleware for accepting video for storing on the server
    async (req, res) => {
    // 'video' should be the name of the file passed in via a form on the frontend
    // accept the file (video) and the name of the file - store this in s3
    const file = req.file;
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    // res.send(result);

    // below is the course url to be stored on mongodb alongside
    // the course
    res.send({videoPath: `http://${req.headers.host}/api/courses/view-video/${result.Key}`});
});

// endpoint to display video to the client, converting binary stored on
// aws to the actual video. It takes in the name of the file as the 'key'
// one must be logged in to view the video
router.get('/view-video/:key', auth, (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
});

// called to store the course's metadata on the database
// accepts an array of video metadata (url and name) and then ties
// them to a particular course on the db hence storing the course
router.post('/', [auth, admin], async (req, res) => {
    // all links for the different videos are passed in as an embedded
    // array of documents
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Prevent duplicates
    let course = await Course.findOne({name: req.body.name});
    if (course) return res.status(400).send("Course already exist");

    course = new Course(req.body);

    const result = await course.save();

    res.send(result);

});

// create another endpoint for adding more videos to a particular course - PUT endpoint
// create delete endpoint for both videos of courses and courses as a whole - 2 delete enpoints
// - recieves course id to locate the course to be deleted
// - recieves video id to locate the video of the course to be deleted
// - delete occurs on mongodb then on aws s3 housing the videos

// display all the available courses to the user
router.get('/', async (req, res) => { // add auth and admin middleware
    const courses = await Course.find().sort({name : 1}).select('-plan_code');
    res.send(courses);
});

// User related
router.get('/get-user-course/:id', async (req, res) => {
    // take the id
    // return course with video urls and their ids
    const courseIdBody = {courseId: req.params.id};
    const {error} = validateCourseForUser(courseIdBody);
    if (error) return res.status(400).send(error.details[0].message);

    const course = await Course.findById(req.params.id);
    res.send(course);
})

// for paid courses: handled by payment endpoint which adds the course only after successful charge

// for storing free courses for different users
router.put('/store-user-free-course', auth, async (req, res) => {
    // access the course property of the user
    // accept id (actual id) of the free course from the body of the request
    // store the actual id of the free course on the particular user document making
    // the api call

    // fix pushing course id with 'completed' issue
    const result = User.updateOne({_id: req.user._id}, {$push: {
                                                        // test this later after linking s3 video storage bucket
                                                        courses: {
                                                                    _id: req.body.courseId
                                                                }
                                                            // update just id of the course
                                                            // 'completed' will be updated
                                                            // continuously via another endpoint
                                                            // as the user progresses with the course
                                                        }
                                                    }, {new : true});
    res.send(result);
});

// endpoint for storing user progress in the 'completed' array
// applies to both free and paid courses
router.put('/store-user-progress', auth, async (req, res) => {
    // access the course property of the user
    // accept video id to store as DONE
    // accept id (actual id) of the free course's videos from
    // the body of the request, indicating completed videos
    // store the actual id of the free course on the particular
    // user document making the api call
    const result = User.updateOne({_id: req.user._id, "courses._id": req.body.courseId},
                                                    {$push: {
                                                        "courses.$.completed": req.body.videoId
                                                        }
                                                    }, {new : true});
    res.send(result);
});

function validateCourseForUser (courseIdBody) {
        const schema = Joi.object({
            courseId: Joi.objectId().required(),
        })

        return schema.validate(courseIdBody);
}

module.exports = router;