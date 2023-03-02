const boom = require('@hapi/boom');
const faker = require('faker');

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.image(),
        detail: faker.lorem.paragraph(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  getProducts() {
    return this.products;
  }

  getProduct(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }

    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }

    return this.products.find((product) => product.id === id);
  }

  addProduct(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  updateProduct(id, product) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    if (this.products[index].isBlocked) {
      throw boom.conflict('Product is blocked');
    }

    this.products[index] = {
      ...this.products[index],
      ...product,
    };

    return this.products[index];
  }

  patchProduct(id, product) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    if (this.products[index].isBlocked) {
      throw boom.conflict('Product is blocked');
    }

    this.products[index] = {
      ...this.products[index],
      ...product,
    };

    return this.products[index];

  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    this.products.splice(index, 1);
  }

}


module.exports = ProductsServices;
