const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class CategoryServices {
  constructor() {}

  async getCategories() {
    try {
      const categories = await models.Category.findAll({
        include: ['products']
      });
      return categories;
    } catch (error) {
      throw boom.batRequest(error);
    }
  }

  async getCategory(id) {
    try {
      const category = await models.Category.findOne({
        where: { id },
        include: ['products']
      });

      if (!category) {
        throw boom.notFound('Category not found');
      }

      return category;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async createCategory(data) {
    try {
      const newCategory = await models.Category.create(data);

      return newCategory;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async updateCategory(id, category) {
    try {
      const categoryToUpdate = await this.getCategory(id)

      const updatedCategory = await categoryToUpdate.update(category);

      return updatedCategory;

    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async deleteCategory(id) {
    try {
      const category = await this.getCategory(id);

      const deletedCategory = await category.destroy();

      return deletedCategory;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }
}

module.exports = CategoryServices;
