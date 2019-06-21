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

};

/*
* file find by filename
* Find file by mongoose query function "where"
* Request parameter filename
* Response course json() 
*/
exports.findByFilename = (req, res) => {

};

/*
*Updating File document
* header accept parameter filename
* request body will be json() 
*/
exports.update = (req, res) => {

};

/*
* Deleting File document
* Header parameter accepts filename
* request body will be json() 
*/
exports.delete = (req, res) => {

};
