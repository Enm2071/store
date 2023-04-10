const express = require('express');
const passport = require('passport');

const CustomerService = require('../services/customer.service');
const { checkRoles } = require('../middlewares/auth.handler');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
  async (req, res, next) => {
    try {
      res.json(await service.getCustomers());
    } catch (error) {
      next(error);
    }
  });

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.getCustomer(id));
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.createCustomer(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.updateCustomer(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.deleteCustomer(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
