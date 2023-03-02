const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return function (req, res, next) {
    const { error } = schema.validate(req[property], { abortEarly: false });
    const valid = error == null;

    if (!valid) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',\n');

      next(boom.badRequest(message));
    }

    next();
  };
}

module.exports = validatorHandler;
