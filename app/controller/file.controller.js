let express = require('express');
const session = require('express-session');
let app = express();
app.use(session({ secret: 'code eye secret', saveUninitialized: true, resave: true }));
let File = require('../models/file.model.js');
let Busboy = require('busboy');

/*
*Creating new File
* Request parameter File json()
* Respond File json()
*/
exports.save = (req, res) => {

    let busboy = new Busboy({ headers: req.headers });

    busboy.on('finish', function () {
        const file = req.files.uploadFile;
        console.log(file);

        const file1 = new File({
            studentid: req.body.studentid,
            assignmentname: req.body.assignmentname,
            date: new Date().toISOString(),
            filename: req.files.uploadFile.name,
            uploadFile: file
        });

        file1.save().then(data => {
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
* Find all files
* Respond files json() array
*/
exports.findAll = (req, res) => {
    File.find().then(files => {
        res.send(files);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get files details"
        });
    });
};

/*
* files find by assignmentname
* Find file by mongoose query function "where"
* Request parameter assignmentname
* Response course json() 
*/
exports.findFilesByAssignmentName = (req, res) => {
    const query = File.where({ assignmentname: req.params.assignmentname });
    query.find().then(files => {
        res.send(files);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get files details"
        });
    });

};


/*
* file find by assignmentname and studentid
* Find file by mongoose query function "where"
* Request parameter assignmentname
* Response course json() 
*/
exports.findFilesByAssignmentNameStudentId = (req, res) => {
    const query = File.where({ assignmentname: req.params.assignmentname, studentid: req.params.studentid });
    query.find().then(files => {
        res.send(files);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get file details"
        });
    });

};

/*
*Updating File document
* header accept parameter assignmentname and studentid
* request body will be json() 
*/
exports.update = (req, res) => {
    File.updateOne({ assignmentname: req.params.assignmentname, studentid: req.params.studentid }, { $set: req.body }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};

/*
* Deleting File document
* Header parameter accepts assignmentname and studentid
* request body will be json() 
*/
exports.delete = (req, res) => {
    File.deleteOne({ assignmentname: req.params.assignmentname, studentid: req.params.studentid }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
};
