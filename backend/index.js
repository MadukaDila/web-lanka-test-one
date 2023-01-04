const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

const connectionUrl ="mongodb://127.0.0.1:27017/demo";
const userRoutes = require("./routes/user.routes");


const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const store = new MongoDBStore({
  uri: connectionUrl,
  collection: "sessions",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(userRoutes);

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.clear();
    console.log("Connected to database...");
    app.listen(5000, () => {
      console.log("Listening at port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
