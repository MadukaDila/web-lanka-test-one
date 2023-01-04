const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");
const axios = require("axios");
const { validationResult } = require("express-validator");
const User = require("../models/user.models");


exports.postSignup = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const fullName = req.body.username;
  const contactNumber = req.body.contact;
  const Address = req.body.address;

  const errors = validationResult(req);
  
  User.findOne({ email: email })
    .then((e) => {
      if (e) {        
        return res.json({ message: "E-mail already in use!!", error: false });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            fullName: fullName,
            contactNumber: contactNumber,
            Address: Address,
            
          });
          return user.save();
        })
        .then((result) => {
          return res.json({ message: "Signup successfull", error: false });
        })
        .catch((err2) => {
          return res.json({ message: "error1", error: true });
        });
    })
    .catch((err) => {
      return res.json({ message: "error2", error: true });
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {        
          return res.json({
            message: "Invalid username or password",
            error: true,
          });
        }
  
        bcrypt
          .compare(password, user.password)
          .then((doMatched) => {
            if (doMatched) {            
              let loggedInUser = {
                // username: user.username,/
                // fullName: user.fullName,
                email: user.email,
                message: "Login successfull",
                error: false,
              };
  
              return res.json({ loggedInUser });
            } else {
              return res.json({
                message: "Login NOT successfull",
                error: true,
              });
            }          
          })
          .catch((err2) => {          
            return res.json({
              message: err2,
              error: true,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          message: err,
          error: true,
        });
      });
  };