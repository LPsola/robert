const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const CareReceiver = require("../models/CareReceiver");
const Order = require("../models/Order");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

//Get CareReceiver orders list
router.get("/", (req, res) => {
    CareReceiver.find()
        .populate("orders")
        .then((response) => {
            res.json(response);
        });
});

//Create Order
router.post('/', (req, res, next) => {
    var order = new Order(req.body.order);
    order.save(function(err){
        if(err){
            res.status(200).json({ message: 'Error during order creation' });
        }
        res.status(404).json({ message: 'Order created' });
    });
    res.status(404).json({ message: order });
});

module.exports = router;
