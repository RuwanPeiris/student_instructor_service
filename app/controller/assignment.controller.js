let express = require('express');
const session = require('express-session');
let app = express();
app.use(session({ secret: 'code eye secret', saveUninitialized: true, resave: true }));
const Assignment = require('../models/assignment.model.js');
let Busboy = require('busboy');

/*
*Creating new Assignment
* Request parameter Assignment json()
* Respond Assignment json()
*/
exports.save = (req, res) => {
    console.log("you are inside assignment save");
    let busboy = new Busboy({ headers: req.headers });

    busboy.on('finish', function () {
        console.log("dcsdsdsdsdvsdvdfvdfv");
        const file = req.files.assignmentFile;
        console.log(file);

        const assignment = new Assignment({
            module_name: req.body.module_name,
            assignment_name: req.body.assignment_name,
            studentid: req.body.studentid,
            date: req.body.data,
            duedate: req.body.duedate,
            description: req.body.description,
            assignmentFile: file
        });

        assignment.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error while saving File.."
            });
        });
    });
    req.pipe(busboy);

};

/*
* Find all Assignment
* Respond Assignment json() array
*/
exports.findAll = (req, res) => {
    Assignment.find().then(assignments => {
        res.send(assignments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get assignments details"
        });
    });
};

/*
* Assignment find by studentId
* Find assignment by mongoose query function "where"
* Request parameter module
* Response assignment json() 
*/
exports.findAssignmentByStudentId = (req, res) => {
    const query = Assignment.where({ studentid: req.params.studentid });
    query.find().then(assignments => {
        res.send(assignments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get assignments details"
        });
    });

};

