import { StockService } from '../services/stocks.service';
import { Request, Response } from 'express';

export class StocksController {
  constructor(private readonly _stockService: StockService) {}
  public async createCount(req: Request, res: Response) {
    try {
      const { product_id, shop_id, count_in_order, count_in_the_storage } =
        req.body;
      const productRes = await this._stockService.createCount(req.body);
      return res.status(201).json(productRes);
    } catch (e) {
      return res.status(400).send({ 'something went wrong': e });
    }
  }
  public async increase(req: Request, res: Response) {
    try {
      const { plu, shop_id } = req.body;
      await this._stockService.increaseCount(req.body);
      return res.status(201).json({ message: 'Product decreased', plu });
    } catch (e) {
      return res.status(400).send({ 'something went wrong': e });
    }
  }
  public async decrease(req: Request, res: Response) {
    try {
      const { plu, shop_id } = req.body;
      await this._stockService.decreaseCount(req.body);
      return res.status(201).json({ message: 'Product decreased', plu });
    } catch (e) {
      return res.status(400).send({ 'something went wrong': e });
    }
  }
  public async filterCount(req: Request, res: Response) {
    try {
      const { plu, shop_id, count_in_order, count_in_the_storage } = req.query;
      const filtered = await this._stockService.countFilter(req.query);
      return res.status(200).json(filtered);
    } catch (e) {
      return res.status(400).send({ 'something went wrong': e });
    }
  }
}
