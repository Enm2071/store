const express = require('express');
const router = express.Router();
const UserService = require('../services/user');


router.get('/', async (req, res) => {
  const userService = new UserService();
  const users = await userService.getUser();
  res.json({
    users
  });
});


module.exports = router;
