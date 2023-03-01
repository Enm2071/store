const express = require('express');
const faker = require('faker');

const router = express.Router();

router.use((req, res, next) => {
  console.log('req', req)
  console.log('Time-products:', Date.now());
  next();
});

router.get('/', (req, res) => {
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


router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === 'special') {
    res.status(404).json({
      message: 'Product not found',
    });
    return;
  }
  res.json({
    product: {
      id,
      name: 'Product 1',
      price: 100,
    },
  });
});

router.post('/', (req, res) => {
  const { body: product } = req;
  console.log('product', product);

  res.status(201).json({
    message: 'Product created',
    product,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { body: product } = req;

  res.json({
    message: 'Product updated',
    product: {
      id,
      ...product,
    },
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body: product } = req;

  res.json({
    message: 'Product replaced',
    product: {
      id,
      ...product,
    },
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.status.json({
    message: 'Product deleted',
    product: {
      id,
    },
  });
});

module.exports = router;
