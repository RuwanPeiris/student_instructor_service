let express = require('express');
const session = require('express-session');
const Instructor = require('../models/instructor_adding.model');
let app = express();
app.use(session({ secret: 'code eye secret', saveUninitialized: true, resave: true }));

exports.create = (req, res) => {
    const instructor = new Instructor({

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

    exports.findAll = (req, res) => {
    Instructor.find().then(instructorData => {
        res.send(instructorData);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get instructor details"
        });
    });
};

    exports.findByID = (req, res) => {
    const query = Instructor.where({_id: req.params.id });
    query.findOne(function (err, instructor) {
        if (err === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found error Object Id"
            });
        }
        if (err === 500) {
            return res.status(500).send({
                message: err.message || "Server error occurred while retrieving  " + req.params.id
            });
        }
        if (instructor != null) {
            //Defining founded Course object & send as response
            let instructorDetails = new Instructor({
                role: instructor.role,
                instructor_name: instructor.instructor_name,
                instructor_email: instructor.instructor_email,
                instructor_password: instructor.instructor_password,
                instructor_phone_number: instructor.instructor_phone_number,
                instructor_address: instructor.instructor_address
            });
            res.send(instructorDetails);
        } else {
            let instructorDetails = new Instructor({
                role: "",
                instructor_name: "",
                instructor_email: "",
                instructor_password: "",
                instructor_phone_number: "",
                instructor_address: ""
            });
            res.send(instructorDetails);
        }

    });
};




exports.findInstructor = (req, res) => {
    const query = Instructor.where({ instructor_name: req.params.instructor_name, instructor_email: req.params.instructor_email,
        instructor_phone_number: req.params.instructor_phone_number ,instructor_address: req.params.instructor_address });
    query.findOne(function (err, instructor) {
        if (err) {
            return res.status(404).send({
                message: "(Data not found error ObjectId"
            });
        }
        else if (err === 500) {
            return res.status(500).send({
                message: err.message || "Server error occurred while retrieving  " + req.params.module_id
            });
        }
        if (instructor != null) {
            //Defining founded instructorAllocationDetail object & send as response
            let instructorDetails = new Instructor({

                role: instructor.role,
                instructor_name: instructor.instructor_name,
                instructor_email: instructor.instructor_email,
                instructor_password: instructor.instructor_password,
                instructor_phone_number: instructor.instructor_phone_number,
                instructor_address: instructor.instructor_address

            });
            res.send(instructorDetails);
        } else {
            let instructorDetails = new Instructor({

                role: null,
                instructor_name: null,
                instructor_email: null,
                instructor_password: null,
                instructor_phone_number: null,
                instructor_address: null

            });
            res.send(instructorDetails);
        }

    });
};


/*
*Updating InstructorAllocation document
* header accept parameter course_id
* request body will be json() 
*/
exports.update = (req, res) => {
    const instructor = Instructor({
        _id:req.params.id,
        role: req.body.role,
        instructor_name: req.body.instructor_name,
        instructor_email: req.body.instructor_email,
        instructor_password: req.body.instructor_password,
        instructor_phone_number: req.body.instructor_phone_number,
        instructor_address: req.body.instructor_address
    });
    console.log(instructor);
    console.log(req.params.id);
    console.log(req.body);
    Instructor.updateOne({_id: req.params.id }, { $set:{role: req.body.role,instructor_name: req.body.instructor_name,
        instructor_email: req.body.instructor_email,
        instructor_password: req.body.instructor_password,
        instructor_phone_number: req.body.instructor_phone_number,
        instructor_address: req.body.instructor_address} }, function (err, result) {
        if (err)throw err;
        res.send(result);
    });
  /*  Instructor.update({_id :  req.body._id },req.data).then(()=>{
        resolve({status : 200, message: "User updated"});
    }).catch(err => {
        reject({status: 500, message : "Error" + err});
    })*/


};

/*
* Deleting InstructorAllocation document
* Header parameter accepts course_ID
* request body will be json() 
*/
exports.delete = (req, res) => {

    console.log("came to delete fun with id : "+ req.params.id)
    Instructor.deleteOne({_id: req.params.id }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
};
