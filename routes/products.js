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
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.getProduct(id);

      res.json({
        product: response,
      });
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body: product } = req;
      const response = await service.createProduct(product);

      res.status(201).json({
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
  async (req, res, next) => {
  const { id } = req.params;
  const { body: product } = req;
  try {
    const response = await service.patchProduct(id, product);

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
  async (req, res, next) => {
  const { id } = req.params;
  const { body: product } = req;
  try {
    const response = await service.updateProduct(id, product);

    res.json({
      message: 'Product replaced',
      product: response,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.deleteProduct(id);

    res.json({
      message: 'Product deleted',
      product: response,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
