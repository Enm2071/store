const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');


const app = express();
const port = 3000;

app.use(express.json());

// this is a middleware that allows us to use cors
// this is a public api

// in production we should use a whitelist
// const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);


app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
