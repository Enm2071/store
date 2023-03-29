const { UserModel, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Product, ProductSchema } = require('./products.model');
const { Category, CategorySchema } = require('./category.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

const setupModels = (sequelize) => {
  UserModel.init(UserSchema, UserModel.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  Customer.associate(sequelize.models);
  UserModel.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = {
  setupModels,
}
