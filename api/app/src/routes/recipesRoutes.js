/* eslint new-cap: ["error", { "capIsNew": false }]*/

const {getRecipe} = require("../handlers/recipesHandler");
const express = require("express");
const middleware = require("../middlewares/joiMiddleware");
const recipeSchema = require("../schemas/joi/recipesSchema");
const recipeRouter = express.Router();

recipeRouter.get("/", middleware(recipeSchema.getRecipe, "query"), getRecipe);

module.exports = recipeRouter;
