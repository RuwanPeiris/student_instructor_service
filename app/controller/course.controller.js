let express = require('express');
const session = require('express-session');
const Course = require('../models/course.model.js');
let app = express();
app.use(session({ secret: 'code eye secret', saveUninitialized: true, resave: true }));

/*
*Creating new Course
* Request parameter Course json()
* Respond Course json()
*/
exports.create = (req, res) => {
    const course = new Course({
        course_name: req.body.course_name,
        course_id: req.body.course_id,
        course_dec: req.body.course_dec,
        course_modules: {
            year1: req.body.course_modules.year1,
            year2: req.body.course_modules.year2,
            year3: req.body.course_modules.year3,
            year4: req.body.course_modules.year4
        }
    });

    course.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while saving Course.."
        });
    });

};

/*
* Find all Courses
* Respond Course json() array
*/
exports.findAll = (req, res) => {
    Course.find().then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get courses details"
        });
    });
};

/*
* Course find by course_ID
* Find course by mongoose query function "where"
* Request parameter course_ID
* Response course json() 
*/
exports.findByCourseID = (req, res) => {
    const query = Course.where({ course_id: req.params.course_id });
    query.findOne(function (err, course) {
        if (err === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found error Object Id"
            });
        }
        if (err === 500) {
            return res.status(500).send({
                message: err.message || "Server error occurred while retrieving  " + req.params.course_id
            });
        }
        if (course != null) {
            //Defining founded Course object & send as response
            let courseDetails = new Course({
                course_name: course.course_name,
                course_id: course.course_id,
                course_dec: course.course_dec,
                course_modules: {
                    year1: course.course_modules.year1,
                    year2: course.course_modules.year2,
                    year3: course.course_modules.year3,
                    year4: course.course_modules.year4
                }
            });
            res.send(courseDetails);
        } else {
            let courseDetails = new Course({
                course_name: null,
                course_id: null,
                course_dec: null,
                course_modules: {
                    year1: [],
                    year2: [],
                    year3: [],
                    year4: []
                }
            });
            res.send(courseDetails);
        }

    });
};

/*
*Updating course document
* header accept parameter course_ID
* request body will be json() 
*/
exports.update = (req, res) => {
    Course.updateOne({ course_id: req.params.course_id }, { $set: req.body }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};

/*
* Deleting course document
* Header parameter accepts course_ID
* request body will be json() 
*/
exports.delete = (req, res) => {
    Course.deleteOne({ course_id: req.params.course_id }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
};
