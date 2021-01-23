const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/User");
const Presence = require("../../models/Presence");
const Teacher = require("../../models/Teacher");
const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateUserInput = require("../../validation/user");
const validateRegisterInput = require("../../validation/register");

// @route   GET api/view
// @desc
// @access  Public
router.get("/view", (req, res) => {
  Presence.find({})

    .populate("userId", ["name"])
    .populate("majorId", ["majorName"])
    .exec(function (err, user) {
      res.json(user);
    });
});

// @route   GET api/view
// @desc
// @access  Public
router.get("/view/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .populate("kelas", ["kelas"])
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const role = req.query.role;

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (role === "admin") {
    Admin.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        errors.username = "Email sudah ada";
        return res.status(400).json(errors);
      } else {
        const newUser = new Admin({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          role: "admin",
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  } else if (role === "teacher") {
    Teacher.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          errors.username = "Email sudah ada";
          return res.status(400).json(errors);
        } else {
          const newUser = new Teacher({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            role: "teacher",
            majorId: [...new Set(req.body.majorId)],
            kelas: req.body.kelas,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => {
        errors.username = "Username & Password tidak boleh kosong";
        return res.status(400).json(errors);
      });
  } else if (role === "siswa") {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          errors.username = "Email sudah ada";
          return res.status(400).json(errors);
        } else {
          const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            role: "siswa",
            name: req.body.name,
            nis: req.body.nis,
            kelas: req.body.kelas,
            age: req.body.age,
            address: req.body.address,
            religion: req.body.religion,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => {
        errors.username = "Username & Password tidak boleh kosong";
        return res.status(400).json(errors);
      });
  } else {
    errors.username = "Role tidak boleh kosong";
    return res.status(400).json(errors);
  }
});

// @route   POST api/users/login
// @desc login api
// @access  public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateUserInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  var myuser;

  User.findOne({ username })
    .populate("kelas", ["kelas"])
    .exec((err, user) => {
      myuser = user;
      Teacher.findOne({ username })
        .populate("kelas", ["kelas"])
        .exec((err, user) => {
          if (user) {
            myuser = user;
          }
          Admin.findOne({ username }).then((user) => {
            if (user) {
              myuser = user;
            }
            // Check for user
            if (!myuser) {
              errors.username = "User tidak ditemukan";
              return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, myuser.password).then((isMatch) => {
              if (isMatch) {
                // User Matched

                var payload;
                if (myuser.role === "teacher") {
                  payload = {
                    id: myuser._id,
                    name: myuser.name,
                    role: myuser.role,
                    majorId: myuser.majorId,
                    kelas: myuser.kelas.kelas,
                    kelasId: myuser.kelas._id,
                  }; // Create JWT Payload
                } else if (myuser.role === "siswa") {
                  payload = {
                    id: myuser._id,
                    name: myuser.name,
                    role: myuser.role,
                    kelas: myuser.kelas.kelas,
                    kelasId: myuser.kelas._id,
                  }; // Create JWT Payload
                } else {
                  payload = {
                    id: myuser._id,
                    name: myuser.name,
                    role: myuser.role,
                  }; // Create JWT Pa
                }
                // const payload = {
                //   id: myuser._id,
                //   name: myuser.username,
                //   role: myuser.role,
                //   role: myuser.majorId,
                // }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                  payload,
                  "secretkey",
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token,
                    });
                  }
                );
              } else {
                errors.password = "Password salah";
                return res.status(400).json(errors);
              }
            });
          });
        });
    });
});

module.exports = router;
