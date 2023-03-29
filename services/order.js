const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor() {
  }

  async find() {
    return await models.Order.findAll();
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });

    if (!order) {
      throw boom.notFound('Order not found');
    }

    return order;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItems(id, item) {
    const order = await this.findOne(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    const orderItems = await models.OrderProduct.create({
      orderId: order.id,
      ...item

    });
    return orderItems;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
