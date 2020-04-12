const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CareReceiver = require("../models/CareReceiver");

router.get("/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  CareReceiver.findById(req.params.id)
    .populate("orders")
    .then((response) => {
      res.json(response);
    });
});

//Get CareReceiver Order Details
router.get("/order/:orderId", (req, res) => {
  CareReceiver.findById(req.params.orderId)
      .populate("orders")
      .then((response) => {
        res.json(response);
      });
});


module.exports = router;
