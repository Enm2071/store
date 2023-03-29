const { ValidationError } = require('sequelize');

function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  res.status(500).send({
    error: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    console.log('entre aqui 3.1');
    const { output: { statusCode, payload } } = err;
    res.status(statusCode).json(payload);
  }

  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log('entre aqui 4.1');
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

module.exports = {
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
  logErrors,
};
