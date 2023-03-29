const productRouter = require('./products');
const userRouter = require('./users');
const categoryRouter = require('./categories');
const customerRouter = require('./customer');
const orderRouter = require('./orders');

function routerApi(app) {
  app.use('/products', productRouter);
  app.use('/users', userRouter);
  app.use('/categories', categoryRouter);
  app.use('/customer', customerRouter);
  app.use('/orders', orderRouter);
}

module.exports = routerApi;
