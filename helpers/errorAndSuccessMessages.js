class CustomError extends Error {
    constructor(status = 500, errorType = 'CUSTOM_GENERIC', ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.status = status;
        this.errorType = errorType;
    }
}


const throwError = (status, errorType, errorMessage = 'Internal Error') => error => {
  if (!error) error = new CustomError(status, errorType, errorMessage);
  else {
    error.status = status;
    error.errorType = errorType;
  }

  throw error;
}

const throwIf = (fn, status, errorType, errorMessage) => result => {
  if (fn(result)) {
    return throwError(status, errorType, errorMessage)();
  }
  return result;
}

const sendSuccess = (res, message) => data => {
  res.status(200).json({type: 'success', message, data});
}

const sendError = (res, status, message) => error => {
  res.status(status || error.status).json({
    type: 'error', 
    message: message || error.message, 
    error,
  });
}

module.exports = {
  throwError,
  throwIf,
  sendSuccess,
  sendError,
  CustomError,
};