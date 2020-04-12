const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const CareReceiver = require("../models/CareReceiver");
const Order = require("../models/Order");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

//List orders
router.get('/', (req, res, next) => {
    Order.find(function(err, orders){
        if (err){
            res.status(404).json({ message: 'Impossible to load orders' });
        }
        res.status(200).json({ message: orders });
    });
});

//Create Order
router.post('/', (req, res, next) => {
    var order = new Order();
 /*   order.preferredMethod = req.body.type;
    order.status = req.body.status;*/
    order.save(function(err){
        if(err){
            res.status(200).json({ message: 'Error during order creation' });
        }
        res.status(404).json({ message: 'Order created' });
    });
    res.status(404).json({ message: order });
});

module.exports = router;
