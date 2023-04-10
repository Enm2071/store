const express = require('express');
const passport = require('passport');

const { checkRoles } = require('../middlewares/auth.handler');
const ProductsServices = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
const { querySchema } = require('../schemas/queries.schema');

const router = express.Router();
const service = new ProductsServices();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
  validatorHandler(querySchema, 'query'),
  async (req, res, next) => {
    try {
      const response = await service.getProducts(req);

      res.json({
        products: response,
      });
    } catch (error) {
      next(error);
    }
  });


router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
  validatorHandler(getProductSchema, 'params'),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
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

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  async (req, res, next) => {
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
