const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

const multer = require("multer");

const Theorys = require("../../models/Theorys");

const validateTheorys = require("../../validation/theorys");

const DIR = "../client/public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf .word allowed!"));
    }
  },
});

router.get("/view/:id", (req, res) => {
  const { id } = req.params;

  Theorys.find({ majorId: mongoose.Types.ObjectId(id) })
    .then((theorys) => {
      return res.json(theorys);
    })
    .catch((err) => console.log(err));
});

router.get("/view/:i/:id", (req, res) => {
  const { i, id } = req.params;

  Theorys.findOne({ majorId: mongoose.Types.ObjectId(id), numberOfTheory: i })
    .sort({ numberOfTheory: "-1" })
    .then((theorys) => {
      return res.json(theorys);
    })
    .catch((err) => console.log(err));
});

router.post("/view", (req, res) => {
  const id = req.body;

  var theorys = [];

  Theorys.find({ majorId: mongoose.Types.ObjectId(id[0]) }).then((theory) => {
    theorys.push(theory);
    if (id.length === 1) {
      return res.json(theorys);
    }
    Theorys.find({ majorId: mongoose.Types.ObjectId(id[1]) }).then((theory) => {
      theorys.push(theory);
      if (id.length === 2) {
        return res.json(theorys);
      }
      Theorys.find({ majorId: mongoose.Types.ObjectId(id[2]) }).then(
        (theory) => {
          theorys.push(theory);
          if (id.length === 3) {
            return res.json(theorys);
          }
        }
      );
    });
  });
});

router.post("/delete/:i/:id", (req, res) => {
  const { i, id } = req.params;

  Theorys.deleteOne({
    majorId: mongoose.Types.ObjectId(id),
    numberOfTheory: i,
  }).then(() => {
    Theorys.find({ majorId: mongoose.Types.ObjectId(id) })
      .then((theorys) => {
        return res.json(theorys);
      })
      .catch((err) => console.log(err));
  });
});

router.get("/view/:id", (req, res) => {
  const { id } = req.params;

  Theorys.find({ majorId: mongoose.Types.ObjectId(id) })
    .then((theorys) => {
      return res.json(theorys);
    })
    .catch((err) => console.log(err));
});

router.post("/create", upload.single("file"), (req, res) => {
  const { description, numberOfTheory, majorId, fileName } = req.body;

  const { errors, isValid } = validateTheorys(req.body, req.file);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Theorys.findOne({
    majorId: mongoose.Types.ObjectId(majorId),
    numberOfTheory: numberOfTheory,
  })
    .then((theorys) => {
      if (theorys) {
        Theorys.updateOne(
          {
            majorId: mongoose.Types.ObjectId(majorId),
            numberOfTheory: numberOfTheory,
          },
          {
            $set: {
              description,
              fileName: req.file.originalname,
            },
          }
        ).then((theory) => {
          console.log(theory);
          return res.json({ sucess: true });
        });
      } else {
        const newTheory = new Theorys({
          majorId,
          description,
          fileName: req.file.originalname,
          numberOfTheory,
        });

        newTheory
          .save()
          .then((theory) => {
            console.log(theory);
            return res.json(theory);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/download", upload.single("file"), (req, res) => {
  var filePath = path.join(__dirname, `../../${DIR}/${req.query.filename}`);
  res.download(filePath);
  res.json({ sucess: true });
});

module.exports = router;
