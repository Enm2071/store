const productRouter = require('./products');
const userRouter = require('./users');
const categoryRouter = require('./categories');

function routerApi(app) {
  app.use('/products', productRouter);
  app.use('/users', userRouter);
  app.use('/categories', categoryRouter);
}

module.exports = routerApi;
