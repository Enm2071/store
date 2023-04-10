const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const CustomerService = require('../services/customer.service');
const config = require('../config/config');
const router = express.Router();

const service = new CustomerService();

router.post('/sign-in',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      delete user.password;
      const customer = await service.getCustomerByUserId(user.id);
      const payload = {
        sub: user.id,
        role: user.role,
        customerId: customer.id,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        message: 'User logged in',
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
