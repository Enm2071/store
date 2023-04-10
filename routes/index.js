const productRouter = require('./products.routes');
const userRouter = require('./users.routes');
const categoryRouter = require('./categories.routes');
const customerRouter = require('./customer.routes');
const orderRouter = require('./orders.routes');
const authRouter = require('./auth.routes');
const profileRouter = require('./profile.routes');

function routerApi(app) {
  app.use('/products', productRouter);
  app.use('/users', userRouter);
  app.use('/categories', categoryRouter);
  app.use('/customer', customerRouter);
  app.use('/orders', orderRouter);
  app.use('/auth', authRouter);
  app.use('/profile', profileRouter);
}

module.exports = routerApi;
