const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async getUsers() {
    const users = await models.User.findAll();
    return users;
  }

  async getUser(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async createUser(user) {
    try {
      const createdUser = await models.User.create(user);
      return createdUser;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async updateUser(id, user) {
    try {
      const user = await this.getUser(id);
      const updatedUser = await user.update(user);
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
      return deletedUser;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

}

module.exports = UserService;
