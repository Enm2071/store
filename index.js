const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', (req, res) => {
  res.json({
    products: [
      { id: 1, name: 'Product 1', price: 1000 },
      { id: 2, name: 'Product 2', price: 2000 },
    ],
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
