const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const CareGiver = require("../models/CareGiver");
const Order = require("../models/Order");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

//Get CareGiver orders list
router.get("/", (req, res) => {
    CareGiver.find({})
        .populate("orders")
        .then((response) => {
            res.json(response);
        });
});


module.exports = router;
