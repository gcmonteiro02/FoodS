const Recipes = require("../controllers/recipesController");
const responseUtil = require("../utils/responseUtil");

/**
* Handler responsible for get recipes by ingredients
* @param {Request} req
* @param {Response} res
* @param {Object} next
*/
module.exports.getRecipe = async (req, res, next) => {
  try {
    const recipes = new Recipes();
    const ingredients = req.query.i;
    const response = await recipes.getRecipe(ingredients);
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    console.log(error.stack);
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};
