const express = require('express');
const passport = require('passport');

const { checkRoles } = require('../middlewares/auth.handler');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  getOrderSchema,
  createOrderSchema,
  addItemsSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  async (req, res, next) => {
    try {
      const { user } = req;
      const data = {
        customerId: user.customerId
      }
      const newOrder = await service.create(data);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:id/item',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(addItemsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.addItems(id, body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
