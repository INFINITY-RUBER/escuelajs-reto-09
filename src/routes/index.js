const express = require('express');
const ProductService = require('../services/index');
const path = require('path');
const receipt = '../assets/receipt.pdf'


function platziStore (app) {
  const router = express.Router();
  app.use('/api/product', router);

  const productService = new ProductService();

  // router.get('/', (req, res) => {
  //   res.send(`API v2`);
  // });

  router.get('/', async function(req, res, next) {
    const { tags } = req.query;

    try {
      const products = await productService.getProducts({ tags });

      res.status(200).json({
        data: products,
        message: 'products listed'
      });
    } catch (err) {
      next(err);
    }
  });

// GET ID
  router.get('/:ProductId', async function(req, res, next) {
    const { ProductId } = req.params;

    try {
      const products = await productService.getProduct({ ProductId });

      res.status(200).json({
        data: products,
        message: 'products retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  // POST
  router.post('/', async function(req, res, next) {
    const { body: product } = req;

    try {
      const createProductId = await productService.createProduct({ product });

      res.status(201).json({
        data: createProductId,
        message: 'product created'
      });
    } catch (err) {
      next(err);
    }
  });

// PUT
  router.put('/:ProductId', async function(req, res, next) {
    const { ProductId } = req.params;
    const { body: Product } = req;

    try {
      const updatedProductId  = await productService.updateProduct({
         ProductId, 
         Product
      });

      res.status(200).json({
        data: updatedProductId,
        message: 'product updated'
      });
    } catch (err) {
      next(err);
    }
  });

// DELETE
  router.delete('/:ProductId', async function(req, res, next) {
    const { ProductId } = req.params;

    try {
      const deletedProductId = await productService.deleteProduct({ ProductId });

      res.status(200).json({
        data: deletedProductId,
        message: 'product deleted'
      });
    } catch (err) {
      next(err);
    }
  });


  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    const storeProducts = await productService.getProducts()
    res.status(200).json(storeProducts);
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;