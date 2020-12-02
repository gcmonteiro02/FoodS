const Joi = require("joi");
const createError = require("http-errors");

const recipesSchema = {
  getRecipe: Joi.object().keys({
    i: Joi.string().required().custom((value, helper) => {
      try {
        const valueSpllited = value.split(",");
        if (valueSpllited.length > 3) {
          return helper.message("Is not allowed more than three ingredients");
        }
        return;
      } catch (error) {
        throw createError(error.statusCode, error.message);
      }
    }),
  }),
};

module.exports = recipesSchema;
