const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const CareReceiver = require("../models/CareReceiver");
const CareGiver = require("../models/CareGiver");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!user) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (thats why we can also send req.user)
      res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const user = req.body.user;
  const username = user.username;
  const careReceiverId = null
  const careGiverId = null


  if (!user.username || !user.password || !user.firstName || !user.lastName) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }
  /*
  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }*/

  // if(password.length < 7){
  //   res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
  //   return;
  // }
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    if(user.role === 'CARE_RECEIVER'){
      const careReceiver = new CareReceiver()
      careReceiver.save(function (err) {
        if (err) {
          res.send(err);
        }
        user.careReceiverId = careReceiver.id;
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        const newuser = new User(user);
        newuser.save((err) => {
          if (err) {
            res
                .status(400)
                .json({ message: "Saving user to database went wrong." });
            return;
          }

          // Automatically log in user after sign up
          // .login() here is actually predefined passport method
          req.login(newuser, (err) => {
            if (err) {
              res.status(500).json({ message: "Login after signup went bad." });
              return;
            }

            // Send the user's information to the frontend
            // We can use also: res.status(200).json(req.user);
            res.status(200).json(newuser);
          });
        });
      });
    }
    else {
      const careGiver = new CareGiver()
      careGiver.save(function (err) {
        if (err) {
          res.send(err);
        }
        user.careGiverId = careGiver.id;
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        const newuser = new User(user);
        newuser.save((err) => {
          if (err) {
            res
                .status(400)
                .json({ message: "Saving user to database went wrong." });
            return;
          }

          // Automatically log in user after sign up
          // .login() here is actually predefined passport method
          req.login(newuser, (err) => {
            if (err) {
              res.status(500).json({ message: "Login after signup went bad." });
              return;
            }

            // Send the user's information to the frontend
            // We can use also: res.status(200).json(req.user);
            res.status(200).json(newuser);
          });
        });
      });
    }
  });
});


router.post("/confirm", (req, res, next) => {
  User.findById(req.body.id, function (err, user) {
    if (err) {
      res.status(404).json({ message: "User not find" });
    } else {
      //Create CareRceiver according user connected
      var careReceiver = new CareReceiver();
      careReceiver.vulnerability = req.body.vulnerability;

      //Nous stockons l'objet en base
      careReceiver.save(function (err) {
        if (err) {
          res.send(err);
        }
        //Update user with address information
        let address = {
          city: req.body.city,
          street: req.body.street,
          streetNumber: req.body.street_number,
          country: req.body.country,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        };

        user.address = address;
        user.careReceiverId = careReceiver.id;
        res.status(200).json({ message: user });
      });
    }
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/getLoggedUser", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
