import { ProductsService } from '../services/products.service';
import { Request, Response } from 'express';
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}
  public async createProduct(req: Request, res: Response) {
    try {
      const plu = req.body;
      const product = await this._productsService.createProduct(plu);
      return res.status(201).json({ message: 'Product created', product });
    } catch (e) {
      return res.status(400).send({ 'something went wrong': e });
    }
  }
  public async filterProducts(req: Request, res: Response) {
    try {
      const { plu, name } = req.query;
      const filtered = await this._productsService.productFilter(req.query);
      return res.status(200).json(filtered);
    } catch (e) {
      res.status(400).send({ 'something went wrong': e });
    }
  }
}
