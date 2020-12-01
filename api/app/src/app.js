const express = require("express");
const bodyParser = require("body-parser");
// const { handlerError } = require("./utils/errorHandler");
const app = express();

// app.use(handlerError);
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});
app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

module.exports = app;