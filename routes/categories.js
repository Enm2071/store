const express = require('express');
const router = express.Router();
const CategoriesServices = require('../services/category');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');
const service = new CategoriesServices();


router.get('/', async (req, res) => {
  res.json({
    categories: await service.getCategories(),
  });
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    const { id } = req.params;

    res.json({
      category: await service.getCategory(id),
    });
  });

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    const { body: category } = req;
    try {
      const response = await service.createCategory(category);

      res.json({
        message: 'Category created',
        category: response,
      });
    } catch (error) {
      next(error);
    }
  });

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: category } = req;
    try {
      const response = await service.patchCategory(id, category);

      res.json({
        message: 'Category updated',
        category: response,
      });
    } catch (error) {
      next(error);
    }
  });

router.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: category } = req;
    try {
      const response = await service.updateCategory(id, category);

      res.json({
        message: 'Category updated',
        category: response,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
