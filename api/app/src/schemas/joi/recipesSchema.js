const Joi = require("joi");
const createError = require("http-errors");

const recipesSchema = {
  getRecipe: Joi.object().keys({
    i: Joi.string().required().allow("").custom((value, helper) => {
      try {
        const valueSpllited = value.split(",");
        if (valueSpllited.length > 3) {
          return helper.message("Desculpe, é permitido no máximo 3 ingredientes por pesquisa.");
        }
        return;
      } catch (error) {
        throw createError(error.statusCode, error.message);
      }
    }),
  }),
};

module.exports = recipesSchema;
