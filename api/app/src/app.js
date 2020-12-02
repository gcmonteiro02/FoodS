const express = require("express");
const bodyParser = require("body-parser");
const {handlerError} = require("./utils/errorHandler");
const recipeRoutes = require("./routes/recipesRoutes");
const app = express();

app.use(handlerError);
app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  }),
);
app.use("/recipes", recipeRoutes);
module.exports = app;
