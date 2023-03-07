const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(30);
const detail = Joi.string().min(10).max(100);

const createCategorySchema = Joi.object({
  name: name.required(),
  detail: detail.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  detail: detail,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
