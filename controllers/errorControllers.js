const AppError = require('../utils/appError');
const sendErrForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrProduction = (err, res) => {
  // Operation , trusted error send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or unknown error: don't leak error details
  } else {
    // log error
    console.log('Error', err);
    res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendErrForDev(err, res);
  } else {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    sendErrProduction(error, res);
  }
};
