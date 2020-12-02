/**
* Class responsible for error responses.
*/
class ErrorResponse {
  /**
   * Create a error message.
   * @param {String} message
  */
  constructor(message) {
    this.message = message;
  }
}

module.exports = ErrorResponse;
