const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.image(),
      detail: faker.lorem.paragraph(),
    });
  }
  res.json({
    products,
  });
});


app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    product: {
      id,
      name: 'Product 1',
      price: 100,
    },
  });
});

app.get('/users', (req, res) => {
  const {limit, offset} = req.query;
  if (limit && offset) {
    res.json({
      users: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
      ],
      limit,
      offset,
    });
  } else {
    res.json({
      users: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ],
    });
  }
});

app.get('/categories/:id/products/:productId', (req, res) => {
    const { id, productId } = req.params;
    res.json({
      product: {
        id: productId,
        name: 'Product 1',
        price: 100,
      },
      category: {
        id,
        name: 'Category 1',
      }
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
