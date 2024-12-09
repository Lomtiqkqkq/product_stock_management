import express from 'express';
import { StocksController } from '../controllers/stocks.controller';

const stockRoute = express.Router();
const stockController = StocksController;

stockRoute.post('/createCount', (req, res) => {
  stockController.prototype.createCount(req, res);
});
stockRoute.post('/increaseCount', (req, res) => {
  stockController.prototype.increase(req, res);
});
stockRoute.post('/decreaseCount', (req, res) => {
  stockController.prototype.decrease(req, res);
});
stockRoute.get('/filterCount', (req, res) => {
  stockController.prototype.filterCount(req, res);
});
export default stockRoute;
