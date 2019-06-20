let express = require('express');
const session = require('express-session');
//const InstructorAllocation = require('../models/instructor_allocation.model.js');
const InstructorAdding = require('../models/instructor_adding.model');
let app = express();
app.use(session({ secret: 'code eye secret', saveUninitialized: true, resave: true }));

/*
*Creating new InstructorAllocation
* Request parameter InstructorAllocation json()
* Respond instructorAllocation json()
*/
exports.create = (req, res) => {
    const instructor = new InstructorAdding({

        role: req.body.role,
        instructor_name: req.body.instructor_name,
        instructor_email: req.body.instructor_email,
        instructor_password: req.body.instructor_password,
        instructor_phone_number: req.body.instructor_phone_number,
        instructor_address: req.body.instructor_address

    });

    instructor.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while saving instructor"
        });
    });

};

/*
* Find all instructorAllocations
* Respond instructorAllocations json() array
*/
exports.findAll = (req, res) => {
    InstructorAllocation.find().then(instructorAllocations => {
        res.send(instructorAllocations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get instructorAllocations details"
        });
    });
};

/*
* instructorAllocations find by course_id and course_name
* Find instructorAllocation by mongoose query function "where"
* Request parameter course_id,course_name
* Response course json() 
*/
exports.findByCourseIDNCourseNameNModuleId = (req, res) => {
    const query = InstructorAllocation.where({ course_id: req.params.course_id, course_name: req.params.course_name, module_id: req.params.module_id });
    query.findOne(function (err, instructorAllocation) {
        if (err === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found error Object Id"
            });
        }
        if (err === 500) {
            return res.status(500).send({
                message: err.message || "Server error occurred while retrieving  " + req.params.module_id
            });
        }
        if (instructorAllocation != null) {
            //Defining founded instructorAllocationDetail object & send as response
            let instructorAllocationDetails = new InstructorAllocation({
                course_name: instructorAllocation.course_name,
                course_id: instructorAllocation.course_id,
                module_name: instructorAllocation.module_name,
                module_id: instructorAllocation.module_id,
                instructors: instructorAllocation.instructors
            });
            res.send(instructorAllocationDetails);
        } else {
            let instructorAllocationDetails = new InstructorAllocation({
                course_name: null,
                course_id: null,
                module_name: null,
                module_id: null,
                instructors: []
            });
            res.send(instructorAllocationDetails);
        }

    });
};

/*
*Updating InstructorAllocation document
* header accept parameter course_id
* request body will be json() 
*/
exports.update = (req, res) => {
    InstructorAllocation.updateOne({ module_id: req.params.module_id }, { $set: req.body }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};

/*
* Deleting InstructorAllocation document
* Header parameter accepts course_ID
* request body will be json() 
*/
exports.delete = (req, res) => {
    InstructorAllocation.deleteOne({ module_id: req.params.module_id }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
};
