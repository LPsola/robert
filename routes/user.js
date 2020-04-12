const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const CareReceiver = require("../models/CareReceiver");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

//List users
router.get('/list', (req, res, next) => {
    User.find(function(err, users){
        if (err){
            res.status(404).json({ message: 'Impossible to load users' });
        }
        res.status(200).json({ message: users });
    });
});

//Update user profil
router.get('/:user_id', (req, res, next) => {
    User.findById(req.params.user_id, function(err, user) {
        if (err){
            res.status(404).json({ message: 'User not found' });
        }else{
            res.status(200).json({ message: user });
        }


    });
});


module.exports = router;
