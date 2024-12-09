import { ProductEntity } from '../entity/product.entity';
import { Repository } from 'typeorm';
import { logAction } from '../events/json.rpc.client';

export interface IProductCreateInput {
  plu: number;
  shop_id: number;
}
interface IProductFilter {
  plu?: number;
  name?: string;
}
export class ProductsService {
  constructor(private readonly _productRepository: Repository<ProductEntity>) {}
  async createProduct(
    product: IProductCreateInput
  ): Promise<IProductCreateInput> {
    const validate = await this._productRepository.findOneBy({
      plu: product.plu
    });
    if (validate) {
      throw new Error('Product already exists');
    } else {
      await this._productRepository.save(product);
      await logAction('createProduct', product);
      return product;
    }
  }
  async productFilter(filters: IProductFilter): Promise<ProductEntity[]> {
    const catchFilter: Record<string, any> = {};
    if (filters.plu) catchFilter.plu = filters.plu;
    if (filters.name) catchFilter.name = filters.name;
    await logAction('productFilter', filters);
    return await this._productRepository.findBy(filters);
  }
}
