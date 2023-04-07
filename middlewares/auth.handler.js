const boom = require('@hapi/boom');
const config = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api']
  if (!apiKey || apiKey !== config.apiKey) {
    next(boom.unauthorized('apiKey is required'));
  }

  next();
}

module.exports = checkApiKey;
