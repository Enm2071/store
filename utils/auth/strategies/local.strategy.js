const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const { validatePassword } = require('../../pass-hash');
const boom = require('@hapi/boom');

const LocalStrategy = new Strategy(async (username, password, done) => {
  try {
    const userService = new UserService();
    const user = await userService.getUserByEmail(username);
    if (!user) {
      done(boom.unauthorized(), false, { message: 'Incorrect email or password.' });
    }

    const isValid = await validatePassword(password, user.password);

    if (!isValid) {
      done(boom.unauthorized(), false, { message: 'Incorrect email or password.' });
    }
    delete user.dataValues.password;
    done(null, user);
  } catch (error) {
    done(error, false);
  }

});

module.exports = LocalStrategy;
