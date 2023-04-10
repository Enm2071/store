const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const boom = require('@hapi/boom');
const { errorHandler, boomErrorHandler, ormErrorHandler, logErrors } = require('./middlewares/error.handler');
// const checkApiKey = require('./middlewares/auth.handler');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// this is a middleware that allows us to use cors
// this is a public api

// in production we should use a whitelist
// const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     console.log('origin', origin, callback);
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }
app.use(cors());
// app.use(checkApiKey)
require('./utils/auth');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

// middleware to handle unknown routes
app.use((req, res, next) => {
  next(boom.notFound('Route not found'));
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
