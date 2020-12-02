const commonsValidator = require("./commonsValidator");
const ErrorResponse = require("../schemas/errorResponse");
const headers = {"Access-Control-Allow-Origin": "*"};

module.exports.errorResponse = (statusCode, error) => {
  const message = (!commonsValidator.isNull(error.message)) ?
    error.message : error;
  return {
    statusCode, headers, body: JSON.stringify(new ErrorResponse(message)),
  };
};
