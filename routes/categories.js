const express = require('express');
const router = express.Router();
const CategoriesServices = require('../services/category');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');
const service = new CategoriesServices();


router.get('/', (req, res) => {
  res.json({
    categories: service.getCategories(),
  });
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  (req, res) => {
    const { id } = req.params;

    res.json({
      category: service.getCategory(id),
    });
  });

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  (req, res) => {
    const { body: category } = req;

    const response = service.addCategory(category);

    res.status(201).json({
      message: 'Category created',
      category: response,
    });
  });

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  (req, res, next) => {
    const { id } = req.params;
    const { body: category } = req;
    try {
      const response = service.patchCategory(id, category);

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
  (req, res, next) => {
    const { id } = req.params;
    const { body: category } = req;
    try {
      const response = service.updateCategory(id, category);

      res.json({
        message: 'Category updated',
        category: response,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
