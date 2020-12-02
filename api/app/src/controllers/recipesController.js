const createError = require("http-errors");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode");
const ERROR_MESSAGES = require("../constants/errorMessages");
const HttpRequest = require("../services/httpRequest");
require("dotenv").config();

/**
 * Class responsible for recipes methods
 */
class Recipes {
  /**
     * Function responsible for get recipes with the ingredients
     * @param {String} ingredients
     */
  async getRecipe(ingredients) {
    try {
      const recipes = await getRecipes(ingredients);
      const formattedResponse = await formatRecipesResponse(ingredients, recipes.response);
      const response = {
        statusCode: HTTP_STATUS_CODE.GET,
        body: formattedResponse,
      };
      return response;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  /**
     * Function responsible to check API's status.
     *
     */
  async checkApiStatus() {
    try {
      const responseGiphyApi = await getGiphys("test");
      const responseRecipesApi = await getRecipes("");
      if ((responseGiphyApi.status >= 400) ||
                (responseRecipesApi.status >= 400)) {
        throw createError(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
          ERROR_MESSAGES.SERVICE_UNAVAILABLE);
      }
      return true;
    } catch (error) {
      console.log(error.stack);
      throw createError(error.statusCode, error.message);
    }
  }
}

/**
 * Function responsible for get recipes in API
 * @param {String} ingredients
 */
const getRecipes = async (ingredients) => {
  const httpRequest = new HttpRequest();
  const httpRequestResponse = await httpRequest.get(`${process.env.RECIPES_API_URL}?i=${ingredients}`, {});
  return {response: httpRequestResponse.data.results, status: httpRequestResponse.status};
};

/**
 * Function responsible to format recipe response
 * @param {String} ingredientsList
 * @param {Array} recipesList
 */
const formatRecipesResponse = async (ingredientsList, recipesList) => {
  const delimiter = ",";
  const ingredientsSplitted = await splitAndTrimArrays(ingredientsList, delimiter);
  const recipesResponse = [];
  for (const {title, href, ingredients} of recipesList) {
    const giphy = await getGiphys(title);
    const ingredientsFormatted = await splitAndTrimArrays(ingredients, delimiter);
    const ingredientsSorted = await sortArrays(ingredientsFormatted);
    recipesResponse.push({
      title: title, ingredients: ingredientsSorted,
      link: href, gif: giphy.response,
    });
  }
  const response = {
    keywords: ingredientsSplitted,
    recipes: recipesResponse,
  };
  return response;
};

/**
 * Function responsible to get giphys in API giphy, using recipe title from recipes response.
 * @param {String} recipeTitle
 */
const getGiphys = async (recipeTitle) => {
  const httpRequest = new HttpRequest();
  const httpRequestResponse = await httpRequest.get(
    `${process.env.GIPHY_API_URL}gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${recipeTitle}&limit=1`, {});
  return {response: httpRequestResponse.data.data[0].images.original.url,
    status: httpRequestResponse.status};
};

/**
 * Function responsible to trim and split strings by delimiter.
 * @param {String} string
 * @param {String} delimiter
 */
const splitAndTrimArrays = async (string, delimiter) => {
  return string.split(delimiter).map((s) => s.trim());
};

/**
 * Function responsible to sort arrays
 * @param {Array} array
 */
const sortArrays = async (array) => {
  return array.sort();
};

module.exports = Recipes;
