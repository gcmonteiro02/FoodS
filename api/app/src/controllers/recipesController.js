const createError = require("http-errors");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode");
const SUCCESS_MESSAGES = require("../constants/successMessages");
const ERROR_MESSAGES = require("../constants/errorMessages");
const HttpRequest = require("../services/httpRequest");
const GIPHY_API_KEY = "hP51EzERZRxA0tAT9l0ENM42tnjMYpBH";

class Recipes {
  /**
   * Function responsible for get recipes with the ingredients
   * @param {String} ingredients
   */
  async getRecipe(ingredients) {
    try {
      const ingredientsSplitted = ingredients.split(",");
      const recipes = await getRecipes(ingredients);
      const giphys = await getGiphys(ingredients);
      console.log(giphys)
      const response = {
        statusCode: HTTP_STATUS_CODE.GET,
        body: giphys,
      };
      return response;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
}

const getRecipes = async (ingredients) => {
    const httpRequest = new HttpRequest();
    const response = await httpRequest.get(`http://www.recipepuppy.com/api/?i=${ingredients}`, {});
    return response.data.results;
}

const getGiphys = async (ingredients) => {
    const httpRequest = new HttpRequest();
    const response = await httpRequest.get(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${ingredients}`, {});
    return response.data;
}

module.exports = Recipes;
