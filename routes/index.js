const productRouter = require('./products');
const userRouter = require('./users');
const categoryRouter = require('./categories');
const customerRouter = require('./customer');

function routerApi(app) {
  app.use('/products', productRouter);
  app.use('/users', userRouter);
  app.use('/categories', categoryRouter);
  app.use('/customer', customerRouter);
}

module.exports = routerApi;
