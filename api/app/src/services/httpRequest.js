const axios = require("axios");
/**
 * Class responsible for make http requests
 */
class HttpsRequests {
  /**
       * Get method http
       * @param {String} url
       * @param {Object} headers
       */
  async get(url, headers) {
      console.log(url)
    const response = await axios.get(url, {headers}).
      catch((error) => error.response);
    return response;
  }
}

module.exports = HttpsRequests;
