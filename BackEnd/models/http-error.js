const httpErrorLog = require("../shared/Logs/loggers");

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add a message property
    this.code = errorCode; //Adds a "code" property
    if (String(errorCode)[0] === 5) {
      //if 500 type error
      let date = Date.now();
      httpErrorLog.error(`(Time:${date}) - ${errorCode}:${message}`);
    }
  }
}

module.exports = HttpError;
