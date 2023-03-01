const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
  console.log('Time-categories:', Date.now());
  next();
});

router.get('/:id/products/:productId', (req, res) => {
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

module.exports = router;
