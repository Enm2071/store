const Joi = require('joi');

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

const getUserSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
