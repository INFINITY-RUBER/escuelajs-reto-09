// const { productsMock } = require('../utils/mocks');
const MongoLib = require('../lib/mongo')

class ProductService {
  constructor(){
    this.collection = 'products';
    this.mongoDB = new MongoLib();

  }
  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags }};
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }
  async getProduct({ ProductId }){
    const product = await this.mongoDB.get(this.collection, ProductId);
    return product || {};

  }
  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product);
    return createProductId;
  }

  async updateProduct({ ProductId, product } = {}) {
    const updatedProductId = await this.mongoDB.update(
      this.collection, 
      ProductId, 
      product
    );
    return updatedProductId;
  }
  
  async deleteProduct({ ProductId }) {
    const deletedProductId = await this.mongoDB.delete(this.collection, ProductId);
    return deletedProductId;
  }

}

module.exports = ProductService;
