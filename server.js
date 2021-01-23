const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Route
const user = require("./routes/api/user");
const announcement = require("./routes/api/announcement");
const majors = require("./routes/api/majors");
const presents = require("./routes/api/presents");
const classs = require("./routes/api/class");
const exams = require("./routes/api/exams");
const theorys = require("./routes/api/theorys");

const app = express();

const cors = require("cors");

// DB Config
const db = process.env.mongoURI || require("./config/keys").mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", user);
app.use("/api/announcement", announcement);
app.use("/api/majors", majors);
app.use("/api/presents", presents);
app.use("/api/class", classs);
app.use("/api/exams", exams);
app.use("/api/theorys", theorys);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
