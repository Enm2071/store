const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class UserService {
  constructor() {}

  async getUsers() {}

  async getUser() {
    const client = await getConnection();
    const response = await client.query('SELECT * FROM public.tasks');

    return response.rows;
  }

  async createUser() {}

  async updateUser() {}

  async deleteUser() {}

}

module.exports = UserService;
