const express = require('express');
const router = express.Router();
const UserService = require('../services/user');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');

router.get('/', async (req, res) => {
  const userService = new UserService();
  const users = await userService.getUsers();
  res.json({
    users
  });
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
  const userService = new UserService();
  const { id } = req.params;
  const user = await userService.getUser(id);
  res.json({
    user
  });
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res,) => {
  const userService = new UserService();
  const user = await userService.createUser(req.body);
  res.json({
    user
  });
});

router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
  const userService = new UserService();
  const { id } = req.params;
  const user = await userService.updateUser(id, req.body);
  res.json({
    user
  });
});

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
  const userService = new UserService();
  const { id } = req.params;
  const user = await userService.updateUser(id, req.body);
  res.json({
    user
  });
});

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
  const userService = new UserService();
  const { id } = req.params;
  const user = await userService.deleteUser(id);
  res.json({
    user
  });
});


module.exports = router;
