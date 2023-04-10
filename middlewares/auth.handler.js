const boom = require('@hapi/boom');
const config = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api']
  if (!apiKey || apiKey !== config.apiKey) {
    next(boom.unauthorized('apiKey is required'));
  }

  next();
}

const checkAdminRole = (req, res, next) => {
  const user = req?.user;
  if (!user || user.role !== 'admin') {
    next(boom.unauthorized('You are not authorized'));
  }

  next();
};

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req?.user;
    if (!user || !roles.includes(user.role)) {
      next(boom.unauthorized('You are not authorized'));
    }

    next();
  }
};

module.exports = {
  checkApiKey,
  checkAdminRole,
  checkRoles,
};
