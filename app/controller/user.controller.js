let express = require('express');
const session = require('express-session');
const User= require('../models/user.model.js');
let app = express();
app.use(session({secret:'code eye secret',saveUninitialized : true, resave: true }));

/*
*Creating new User
* Request parameter User json()
* Respond User json()
*/
exports.create = (req,res) => {
    const user = new User({
        usr_role : req.body.usr_role,
        usr_permission : req.body.usr_permission,
        usr_name : req.body.usr_name,
        usr_faculty: req.body.usr_faculty,
        usr_department: req.body.usr_department,
        usr_password: req.body.usr_password
    });

    user.save().then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while saving User.."
        });
    });

};

/*
* Find all Users
* Respond User json() array
*/
exports.findAll = (req,res) => {
    User.find().then(users =>{
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get users details"
        });
    });
};

/*
* Find User by user id
*/
exports.findOne = (req,res) => {
    User.findById(req.params._id).then(user => {
        if(!user){
            return res.status(404).send({
                message: "User not found with id "+ req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "User not found with id "+ req.params._id
            });
        }
        return res.status(500).send({
            message: err.message || "Error occurred while retrieving  "+ req.params._id
        });
    })
};

/*
*Updating user document
* header accept parameter usr_name
* request body will be json() {"n": 1,"ok": 1,"updatedCount": 1}
*/
exports.update = (req,res) => {
    User.updateOne({usr_name: req.params.usr_name},{$set:req.body}, function (err,result) {
        if(err) throw err;
        res.send(result);
    });
};

/*
* Deleting user document
* Header parameter accepts usr_name
* request body will be json() {"n": 1,"ok": 1,"deletedCount": 1}
*/
exports.delete = (req,res) => {
    User.deleteOne({usr_name: req.params.usr_name}, function (err,result) {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
};

/*
* User login using post request
* Find user by mongoose query function "where"
* Request parameter usr_name, usr_password
* Response json() {usr_name: <value>}
*/
exports.login = (req,res) => {
    const query = User.where({usr_name: req.body.usr_name, usr_password: req.body.usr_password});
    query.findOne(function (err, user) {
        if (err === 'ObjectId') {
            return res.status(404).send({
                message: "User not found error Object Id"
            });
        }
        if (err === 500) {
            return res.status(500).send({
                message: err.message || "Server error occurred while retrieving  " + req.body.usr_name
            });
        }
        if (user != null) {
            //Defining founded User object & send as response
            let userDetails = new User({
                usr_name: req.body.usr_name
            });
            res.send(userDetails);
        } else {
            let userDetails = new User({
                usr_name: null
            });
            res.send(userDetails)
        }

    });
};

exports.logout = (req,res) => {

};
