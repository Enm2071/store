const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CustomerServices {

  constructor() {}

  async getCustomers() {
    try {
      const customers = await models.Customer.findAll({
        include: ['user']
      });
      return customers;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async getCustomer(id) {
    try {
      const customer = await models.Customer.findOne({
        where: {
          id,
        }
      }, {
        include: ['user']
      });

      if (!customer) {
        throw boom.notFound('Customer not found');
      }
      return customer;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async createCustomer(customer) {
    try {
      const { user: {
        email,
        password
      } } = customer;

      const user = await models.User.findOne({
        where: {
          email,
          password
        }
      });

      let id = user?.id;
      if (!user) {
        const userCreate = await models.User.create({
          email,
          password
        });
        id = userCreate.id;
      }

      const newCustomerData = {
        name: customer.name,
        lastName: customer.lastName,
        phone: customer.phone,
        userId: id
      }
      const newCustomer = await models.Customer.create(newCustomerData);
      return newCustomer;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async updateCustomer(id, customer) {
    try {
      const customerToUpdate = await this.getCustomer(id);
      const customerUpdated = await customerToUpdate.update(customer);
      return customerUpdated;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async deleteCustomer(id) {
    try {
      const customerDeleted = await this.getCustomer(id);
      await customerDeleted.destroy();
      return customerDeleted;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

}


module.exports = CustomerServices;
