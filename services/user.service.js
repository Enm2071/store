const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { generateHash } = require('../utils/pass-hash');

class UserService {
  constructor() { }

  async getUsers() {
    const users = await models.User.findAll({
      include: ['customer']
    });
    users.forEach(user => {
      delete user.dataValues.password;
    });
    return users;
  }

  async getUser(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer'],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async getUserByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async createUser(user) {
    try {

      const userModel = {
        ...user,
        password: await generateHash(user.password),
      }

      const createdUser = await models.User.create(userModel, {
        include: ['customer']
      });

      delete createdUser.dataValues.password;
      return createdUser;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async updateUser(id, user) {
    try {
      const user = await this.getUser(id);
      const updatedUser = await user.update(user);
      delete updatedUser.dataValues.password;
      return updatedUser;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await models.User.destroy({
        where: {
          id,
        },
      });
      delete deletedUser.dataValues.password;
      return deletedUser;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

}

module.exports = UserService;
