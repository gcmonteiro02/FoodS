const createError = require("http-errors");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode");
const ERROR_MESSAGES = require("../constants/errorMessages");
const HttpRequest = require("../services/httpRequest");
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
      const responseRecipesApi = await getRecipes("test");
      if ((responseGiphyApi.status >= 400) ||
                (responseRecipesApi.status >= 400)) {
        throw createError(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
          ERROR_MESSAGES.SERVICE_UNAVAILABLE);
      }
    } catch (error) {
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
  const response = await httpRequest.get(`${process.env.RECIPES_API_URL}?i=${ingredients}`, {});
  return {response: response.data.results, status: response.status};
};

/**
 * Function responsible to format recipe response
 * @param {String} ingredientsList
 * @param {Array} recipesList
 */
const formatRecipesResponse = async (ingredientsList, recipesList) => {
  const ingredientsSplitted = ingredientsList.split(",").map((s) => s.trim());
  const recipesResponse = [];
  for (const {title, href, ingredients} of recipesList) {
    const giphy = await getGiphys(title);
    const ingredientsFormatted = ingredients.split(",").map((s) => s.trim()).
      sort();
    recipesResponse.push({
      title: title, ingredients: ingredientsFormatted,
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
    `${process.env.GIPHY_API_URL}/gifs/search?api_key=
    ${process.env.GIPHY_API_KEY}&q=${recipeTitle}&limit=1`, {});
  return {response: httpRequestResponse.data.data[0].images.original.url,
    status: response.status};
};

module.exports = Recipes;
