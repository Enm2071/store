const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');
const userService = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const response = await userService.getUsers();
    res.json({
      users: response,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await userService.getUser(id);
      res.json({
        user: response,
      });
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body: user } = req;
      const response = await userService.createUser(user);
      res.json({
        message: 'User created',
        user: response,
      });
    } catch (error) {
      next(error);
    }
  });

router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);
      res.json({
        user
      });
    } catch (error) {
      next(error);
    }
  });

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.patchUser(id, req.body);
      res.json({
        user
      });
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      res.json({
        user
      });
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
