const User= require('../models/user.model.js');

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

exports.findAll = (req,res) => {
    User.find().then(users =>{
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Can not get users details"
        });
    });
};

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

exports.update = (req,res) => {

};
exports.delete = (req,res) => {

};
