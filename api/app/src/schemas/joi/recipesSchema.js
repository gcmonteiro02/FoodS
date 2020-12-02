const Joi = require("joi");
const createError = require("http-errors");

const recipesSchema = {
  getRecipe: Joi.object().keys({
    i: Joi.string().required().allow("").custom((value, helper) => {
      try {
        const valueSpllited = value.split(",");
        if (valueSpllited.length > 3) {
          return helper.message("Sorry, a maximum of 3 ingredients per search is allowed.");
        }
        return;
      } catch (error) {
        throw createError(error.statusCode, error.message);
      }
    }),
  }),
};

module.exports = recipesSchema;
