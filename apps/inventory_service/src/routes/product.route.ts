import express from 'express';
import { ProductsController } from '../controllers/products.controller';

const productRoute = express.Router();
const productsController = ProductsController;

productRoute.post('/createProduct', (req, res) => {
  productsController.prototype.createProduct(req, res);
});
productRoute.get('/filterProducts', (req, res) => {
  productsController.prototype.filterProducts(req, res);
});
export default productRoute;
