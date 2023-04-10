const express = require('express');
const passport = require('passport');

const { checkRoles } = require('../middlewares/auth.handler');
const CategoriesServices = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoriesServices();

router.get('/', async (req, res) => {
  passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'customer']),
    res.json({
      categories: await service.getCategories(),
    });
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await service.getCategory(id);

      res.json({
        category: response,
      });
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
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
