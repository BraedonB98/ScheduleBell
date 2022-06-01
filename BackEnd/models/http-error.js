class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add a message property
    this.code = errorCode; //Adds a "code" property
    if (this.code === 500) {
      //!make this all 500 type errors
      //!add to server log
    }
  }
}

module.exports = HttpError;
