function errorHandler (err, req, res, next) {
  res.status(500).send({
    error: err.message,
    stack: err.stack,
  });
  next(err);
}

function boomErrorHandler (err, req, res, next) {
  if (!err.isBoom) {
    next(err);
  }

  const { output: { statusCode, payload } } = err;

  res.status(statusCode).json(payload);
}

module.exports = {
  errorHandler,
  boomErrorHandler
};
