const express = require('express');
const ProductsServices = require('../services/product');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.getProducts();

    res.json({
      products: response,
    });
  } catch (error) {
    next(error);
  }
});


router.get('/:id', validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const response = service.getProduct(id);

      res.json({
        product: response,
      });
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  (req, res, next) => {
    try {
      const { body: product } = req;
      const response = service.createProduct(product);

      res.json({
        message: 'Product created',
        product: response,
      });
    } catch (error) {
      next(error);
    }
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
