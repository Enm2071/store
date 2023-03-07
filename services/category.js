const boom = require('@hapi/boom');
const faker = require('faker');


class CategoryServices {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        detail: faker.lorem.paragraph(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  getCategories() {
    return this.categories;
  }

  getCategory(id) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw boom.notFound('Category not found');
    }

    if (category.isBlocked) {
      throw boom.conflict('Category is blocked');
    }

    return this.categories.find((category) => category.id === id);
  }

  addCategory(category) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...category,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  updateCategory(id, category) {
    const index = this.categories.findIndex((category) => category.id === id);

    if (index === -1) {
      throw boom.notFound('Category not found');
    }

    if (this.categories[index].isBlocked) {
      throw boom.conflict('Category is blocked');
    }

    const updatedCategory = {
      id,
      ...category,
    };

    this.categories[index] = updatedCategory;

    return updatedCategory;
  }

  deleteCategory(id) {
    const index = this.categories.findIndex((category) => category.id === id);

    if (index === -1) {
      throw boom.notFound('Category not found');
    }

    if (this.categories[index].isBlocked) {
      throw boom.conflict('Category is blocked');
    }

    this.categories.splice(index, 1);

    return { id };
  }
}

module.exports = CategoryServices;
