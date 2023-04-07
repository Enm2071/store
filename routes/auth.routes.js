const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/sign-in',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const { user } = req;
      delete user.password;
      res.json({
        message: 'User logged in',
        user,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
