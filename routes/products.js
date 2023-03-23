const express = require('express');
const ProductsServices = require('../services/product');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res) => {
  res.json({
    products: await service.getProducts(),
  });
});


router.get('/:id', validatorHandler(getProductSchema, 'params'),
  (req, res) => {
    const { id } = req.params;

    res.json({
      product: service.getProduct(id),
    });
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  (req, res) => {
    const { body: product } = req;

    const response = service.addProduct(product);

    res.status(201).json({
      message: 'Product created',
      product: response,
    });
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
  const { id } = req.params;
  const { body: product } = req;
  try {
    const response = service.patchProduct(id, product);

    res.json({
      message: 'Product updated',
      product: response,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
  const { id } = req.params;
  const { body: product } = req;
  try {
    const response = service.updateProduct(id, product);

    res.json({
      message: 'Product replaced',
      product: response,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  try {
    const response = service.deleteProduct(id);

    res.json({
      message: 'Product deleted',
      product: response,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
